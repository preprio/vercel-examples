import { NextRequest, NextResponse } from 'next/server'
import countries from './lib/countries.json'
import { gql } from "@apollo/client";
// @ts-ignore
import client from "apollo-client";

// run only on homepage
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export async function middleware(req: NextRequest) {

  const { nextUrl: url, geo } = req
  const pageSlug = req.nextUrl.pathname.substring(1) || 'home-page-personalization';

  const country = geo.country || 'US'
  const city = geo.city || 'San Francisco'
  const region = geo.region || 'CA'

  // Geo IP
  const countryInfo = countries.find((x) => x.cca2 === country)
  const currencyCode = Object.keys(countryInfo.currencies)[0]
  const currency = countryInfo.currencies[currencyCode]
  const languages = Object.values(countryInfo.languages).join(', ')

  const data = await client.query({
    query: gql`
      query Page {
          Page(slug:"${pageSlug}") {
              title
              stack(personalize:false) {
                  __typename
                  ... on PageHeader {
                      heading
                      image {
                        url(width: 1920)
                      }
                      context: _context {
                          segments
                          countries
                          variant_id
                      } 
                  }
              }
          }
      }
    `,
  });

  let heading = "Page Not Found";
  let segment = "ALL_OTHER_USERS";
  let background = "https://demo-site-patterns.stream.prepr.io/w_1920/5thj9sim662o-pexels-igor-ovsyannykov-205961.jpg";

  if(data.data.Page) {

    const options = {
      country: country,
      segment: null,
    };

    if(req.nextUrl.searchParams.get('utm_campaign')) {
      options.segment = req.nextUrl.searchParams.get('utm_campaign');
      segment = req.nextUrl.searchParams.get('utm_campaign');
    }

    const pageHeader = data.data.Page.stack.filter(obj => Object.keys(options).some(key => {

          if (options[key]) {
            if (obj.__typename === "PageHeader" && obj.context) {

              if (obj.context.segments) {

                if (obj.context.segments.includes(options[key].toLowerCase())) {

                  if (obj.context.countries) {

                    if (obj.context.countries.includes(options[key])) {
                      return true;
                    }

                    return false;
                  }

                  return true;
                }
              }

              if (obj.context.countries) {
                if (obj.context.countries.includes(options[key])) {
                  return !obj.context.segments;
                }
              }
            }
          }
        }
    ));

    if(pageHeader.length > 0) {
      heading = pageHeader[0].heading;
      background = pageHeader[0].image[0].url;
    }
    else {

      const pageHeader = data.data.Page.stack.filter(obj => Object.keys(options).some(key => {
            if (obj.__typename === "PageHeader" && obj.context) {
              if (obj.context.variant_id === "ALL_OTHER_USERS") {
                return true;
              }
            }
          }
      ));

      if (pageHeader.length > 0) {
        heading = pageHeader[0].heading;
        background = pageHeader[0].image[0].url;
      }
    }
  }

  url.searchParams.set('heading', heading)
  url.searchParams.set('background', background)
  url.searchParams.set('country', country)
  url.searchParams.set('segment', segment)
  url.searchParams.set('city', city)
  url.searchParams.set('region', region)
  url.searchParams.set('languages', languages)

  return NextResponse.rewrite(url)
}
