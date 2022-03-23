import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function Blog({ blogData }) {
  return (
    <>
      {/* Header section */}
      <header>
        <div
          className="page-header section-height-75"
          style={{
            backgroundImage: "url(/images/blog/blog-section-cover.webp)",
          }}
        >
          <span className="mask bg-gradient-dark"></span>
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-white text-center">
                <h2 className="text-white">{blogData.Title}</h2>
              </div>
            </div>
          </div>
        </div>
        <div
          className="position-relative overflow-hidden"
          style={{ height: "36px", marginTop: "-35px" }}
        >
          <div
            className="w-full absolute bottom-0 start-0 end-0"
            style={{
              transform: "scale(2)",
              transformOrigin: "top center",
              color: "#fff",
            }}
          >
            <svg
              viewBox="0 0 2880 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
      </header>
      {/* Header section */}

      {/* Blog body */}
      <section className="py-5 bg-gray-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <div className="card card-blog card-plain">
                <div className="position-relative">
                  <a className="d-block blur-shadow-image">
                    <Image
                      src={blogData.CoverImage.url}
                      alt="img-blur-shadow"
                      className="img-fluid shadow border-radius-lg"
                      width={720}
                      height={540}
                      layout="responsive"
                    />
                  </a>
                </div>
                <div className="card-body px-0 pt-4">
                  <p className="text-gradient text-primary text-gradient font-weight-bold text-sm text-uppercase">
                    {blogData.publishDate}
                  </p>
                  <ReactMarkdown className="text-justify">{blogData.Body}</ReactMarkdown>
                  <Link href="/blogs">
                    <button
                      type="button"
                      className="btn bg-gradient-primary mt-3"
                    >
                      Back to Blogs
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Blog body */}
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.STRAPI_URL}/articles`);
  const blogList = await res.json();

  return {
    paths: blogList.map((item) => ({
      params: {
        slug: String(item.id),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await fetch(
    `${process.env.STRAPI_URL}//auticare-blogs?id=${params.slug}`
  );
  const blogData = await data.json();

  return {
    props: {
      blogData: blogData[0],
    },
    revalidate: 60,
  };
}
