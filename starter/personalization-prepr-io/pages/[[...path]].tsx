import Image from 'next/image'
import { Layout } from '@vercel/examples-ui'

// Forward properties from `middleware.ts`
// When support for configuring gSSP to use Edge Functions lands,
// We could add that logic here directly.
export const getServerSideProps = ({ query }) => ({
    props: query,
})

export default function Index({
                                  heading,
                                  background,
                                  languages,
                                  city,
                                  country,
                                  segment,
                              }) {

    heading = decodeURIComponent(heading)
    city = decodeURIComponent(city)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
            <div className="fixed inset-0 overflow-hidden opacity-95 bg-[#f8fafb]">
                <Image alt="Image for {heading}" style={{ objectFit: 'cover' }} src={background} fill={true} quality={100} />
            </div>
            <main className="flex flex-col items-center flex-1 px-4 sm:px-20 text-center z-10 pt-8 sm:pt-20">
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{heading}</h1>
                <p className="mt-4 text-lg sm:text-xl text-white">
                    Show personalized content based on UTM-campaign and geo location<br/>on the Edge with Next.js and the Prepr stack field
                </p>

                <a
                    className="flex items-center mt-4 text-md sm:text-lg text-white hover:underline"
                    href="https://docs.prepr.io/reference/graphql/v1/personalization-recommendations-personalized-stack?utm_source=nextjs-personalization-demo&utm_campaign=prepr-personalization-demo"
                    target="_blank"
                    rel="noreferrer"
                >
                    View Prepr Stack Documentation
                    <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        stroke="currentColor"
                        className="ml-1"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        shapeRendering="geometricPrecision"
                    >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                    </svg>
                </a>
                <a
                    className="flex items-center text-md sm:text-lg text-white hover:underline"
                    href="https://vercel.com/docs/concepts/functions/edge-middleware?utm_source=prepr-personalization-demo&utm_campaign=prepr-personalization-demo"
                    target="_blank"
                    rel="noreferrer"
                >
                    View Next.js Edge Documentation
                    <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        stroke="currentColor"
                        className="ml-1"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        shapeRendering="geometricPrecision"
                    >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                    </svg>
                </a>
                <section className="border border-gray-300 bg-white rounded-lg shadow-lg mt-16 min-w-min w-1/2 hover:shadow-2xl transition">
                    <div className="p-4 flex justify-center items-between border-b">
                        <div className="self-center">
                            <Image
                                alt={`${country} flag`}
                                className="rounded-full"
                                src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
                                width={32}
                                height={32}
                            />
                        </div>
                        <div className="ml-4 mr-auto text-left">
                            <h4 className="font-semibold">{country}</h4>
                            <h5 className="text-gray-700">{city}</h5>
                        </div>
                    </div>
                    <div className="p-4 flexborder-b bg-gray-50 rounded-b-lg">
                        <h4 className="font-semibold text-left">Personalized for:</h4>
                        <pre className="bg-black text-white font-mono text-left py-2 px-4 rounded-lg mt-4 text-sm leading-6">
                          <p>
                            <strong>{'segment/utm-campaign: '}</strong>
                              {segment}
                          </p>
                          <p>
                            <strong>{'x-vercel-ip-country: '}</strong>
                              {country}
                          </p>
                        </pre>
                    </div>
                    <div className="p-4 flex justify-center items-between border-b bg-gray-50">
                        <h4 className="font-semibold text-left mr-auto">Languages</h4>
                        <div className="self-center">
                            <p className="text-gray-700">{languages}</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

Index.Layout = Layout
