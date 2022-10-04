import {
  AttachMoney,
  CreateOutlined,
  GroupOutlined,
  MultipleStopOutlined,
  SavingsOutlined,
} from '@mui/icons-material';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { HeartIcon } from '@/assets/icons';
import BigText from '@/components/bigText';
import Layout from '@/components/layout';

const Home: NextPage = () => {
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    router.prefetch('/explore');
    if (isConnected) {
      router.push('/explore');
    }
  }, [isConnected, router]);

  return (
    <Layout>
      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            {/* <h1 className="bg-gradient-to-r from-pink-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Create, Sell, and Earn
              <span className="sm:block ">Your Content Your NFT</span>
            </h1> */}

            <BigText slides={['Create', 'Sell', 'Earn']} />
            <p className="mx-auto mt-4 max-w-xl font-semibold opacity-60 sm:text-xl sm:leading-relaxed">
              The first social media NFT marketplace which can benefit both
              content creators and their audiences.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded-lg border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/create"
              >
                Start Creating
              </a>

              <a
                className="block w-full rounded-lg border border-blue-600 px-12 py-3 text-sm font-medium text-black hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-800 sm:w-auto"
                href="/explore"
              >
                Explore
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative grid grid-cols-1 gap-y-8 lg:grid-cols-1 lg:items-center lg:gap-x-1">
            <div className="absolute top-0 -left-4 h-72 w-72 animate-blob rounded-full bg-orange-100 opacity-70 mix-blend-multiply blur-xl"></div>
            <div className="animation-delay-2000 absolute top-0 -right-4 h-72 w-72 animate-blob rounded-full bg-red-200 opacity-70 mix-blend-multiply blur-xl"></div>
            <div className="animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 animate-blob rounded-full bg-blue-300 opacity-70 mix-blend-multiply blur-xl"></div>

            <div className="mx-auto max-w-lg text-center lg:mx-0 lg:text-left">
              <h2 className="text-3xl font-bold sm:text-4xl">Your Content.</h2>
              <h2 className="text-3xl font-bold sm:text-4xl">Your NFT.</h2>

              <p className="mt-4 text-gray-600">
                We want to build the social media which fully run by itself
              </p>

              {/* <a
                className="mt-8 inline-flex items-center rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                href="/create"
              >
                <span className="text-sm font-medium"> create </span>

                <svg
                  className="ml-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a> */}
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="block rounded-xl border-2 border-black p-4 shadow-sm ">
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <CreateOutlined />
                </span>

                <h6 className="mt-2 font-bold">Create your NFT</h6>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Create your content like image or video as NFT on
                  decentralized storage.
                </p>
              </div>

              <div className="block rounded-xl border-2 border-black p-4 shadow-sm ">
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <MultipleStopOutlined />
                </span>

                <h6 className="mt-2 font-bold">Sell your NFT</h6>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Monitize your NFT post by listing on the market. You content
                  is valueable.
                </p>
              </div>

              <div className="block rounded-xl border-2 border-black p-4 shadow-sm ">
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <AttachMoney />
                </span>

                <h6 className="mt-2 font-bold">
                  Support your favorite Creator
                </h6>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Liking your favorite post by tipping $Promise token. For
                  content creator, you don&apos;t have to sell yourself by
                  promoting ad.
                </p>
              </div>

              <div className="block rounded-xl border-2 border-black p-4 shadow-sm">
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <HeartIcon />
                </span>

                <h6 className="mt-2 font-bold">Like-to-Earn</h6>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  For people who liked your NFT, when NFT post got sold, they
                  will have partial share of the sale.
                </p>
              </div>

              <div className="block rounded-xl border-2 border-black p-4 shadow-sm ">
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <GroupOutlined />
                </span>

                <h6 className="mt-2 font-bold">Share with friends</h6>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Share your own created content to your connections.
                </p>
              </div>

              <div className="block rounded-xl border-2 border-black p-4 shadow-sm ">
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                  <SavingsOutlined />
                </span>

                <h6 className="mt-2 font-bold">Post-to-Earn</h6>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  Creating content and earn $Promise token. Also grow your
                  audiences and earn likes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="m-8 space-y-4">
        <h2 className="ml-2 text-2xl font-semibold sm:text-3xl">FAQs</h2>
        <details className="group" open>
          <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4">
            <h5 className="font-medium text-gray-900">
              What&apos;s the different between PromiseLand and traditional
              social media platform?
            </h5>

            <svg
              className="ml-1.5 h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="mt-4 px-4 leading-relaxed text-gray-700">
            PromiseLand is not a company, it is a protocol and DAO which is
            backed by promiseLand foundation and community. We would like to
            make promiseland a decentralized, open-source, community-owned
            content creation platform.
          </p>
        </details>

        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4">
            <h5 className="font-medium text-gray-900">
              How PromiseLand and $Promise token work?
            </h5>

            <svg
              className="ml-1.5 h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>

          <p className="mt-4 px-4 leading-relaxed text-gray-700">
            When user create a NFT token, people can like it by paying $Promise
            token. After the NFT got sold, the creator can get the sale and
            likes rewards. And all the likers can get certain percent of the
            sale (like 5%). The buyer can get the all the likes reward when he
            owns the NFT post. And all the likers can get certain percent of the
            next sale (like 5%). Each time the NFT got sold, the sale will be
            distributed to all the likers, platform, creator, and seller.
          </p>
        </details>
      </section>

      <footer className="bg-white text-center">
        <div className="mx-auto max-w-screen-xl border-t-2 border-gray-900 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="flex justify-center gap-6">
              <a
                className="text-blue-500 hover:text-blue-500/75"
                href="https://twitter.com/promiseland_app"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>

              <a
                className="text-gray-900 hover:text-gray-900/75"
                href="/"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>

              <a
                className="text-pink-600 hover:text-pink-600/75"
                href="/"
                target="_blank"
                rel="noreferrer"
                aria-label="Dribbble"
              >
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 71 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0)">
                    <path
                      d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                      fill="#5865F2"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="71" height="55" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>

            <nav className=" p-6">
              <ul className="flex flex-wrap justify-center gap-6 text-sm font-bold">
                <li>
                  <a
                    className="text-gray-900 transition hover:text-gray-900/75"
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Document
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-900 transition hover:text-gray-900/75"
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Careers
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-900 transition hover:text-gray-900/75"
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Blog
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-900 transition hover:text-gray-900/75"
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            <p className="mx-auto max-w-lg text-xs text-gray-500">
              PromiseLand is still on early development. If you want to help
              build the decentrialized autonomous social media that people need,
              we need you! We are looking for all kinds of people!
              <span className="mt-4 block"> &copy; 2022 Promiseland </span>
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Home;
