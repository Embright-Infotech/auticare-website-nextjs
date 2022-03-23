import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FONTAWESOMEICON } from "../../utils/fontawesome-icons";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "../../utils/social-links";

export default function Blogs({ blogList }) {
  return (
    <>
      <header>
        <div
          className="page-header section-height-100"
          style={{
            backgroundImage: "url(/images/blog/blog-section-cover.webp)",
          }}
        >
          <span className="mask bg-gradient-dark opacity-4"></span>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-sm-9 text-center mx-auto">
                <h1 className="text-white mb-4">Our Blogs</h1>
                <p className="lead text-white mb-sm-6 mb-4">
                  We’re constantly trying to express ourselves and actualize our
                  dreams. If you would like to know more about our works and the
                  fields of study we are in have a read of our blogs to get an
                  understanding.
                </p>
                <p className="text-white h6 text-uppercase mb-4">
                  connect with us on:
                </p>

                <div className="d-flex justify-content-center">
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener"
                  >
                    <FontAwesomeIcon
                      className="fab fa-2x text-white me-5"
                      icon={FONTAWESOMEICON.iconFacebook}
                    />
                  </a>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener"
                  >
                    <FontAwesomeIcon
                      className="fab fa-2x text-white me-5"
                      icon={FONTAWESOMEICON.iconInstagram}
                    />
                  </a>
                  <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener">
                    <FontAwesomeIcon
                      className="fab fa-2x text-white me-5"
                      icon={FONTAWESOMEICON.iconTwitter}
                    />
                  </a>
                  <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener">
                    <FontAwesomeIcon
                      className="fab fa-2x text-white me-5"
                      icon={FONTAWESOMEICON.iconYoutube}
                    />
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener"
                  >
                    <FontAwesomeIcon
                      className="fab fa-2x text-white me-5"
                      icon={FONTAWESOMEICON.iconLinkedin}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="relative"
          style={{
            height: "36px",
            overflow: "hidden",
            marginTop: "-36px",
            zIndex: "2",
          }}
        >
          <div
            className="w-full absolute bottom-0 start-0 end-0"
            style={{
              transform: "scale(2)",
              transformOrigin: "top center",
              color: "#fbfbfb",
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

      {/* Blog list section */}
      <section className="py-6 bg-gray-100">
        <div className="container">
          <div className="row">
            {blogList.map((item) => (
              <div className="col-lg-4 mb-lg-0 mb-4 mt-3" key={item.id}>
                <div className="card">
                  <div className="card-header p-0 mx-3 mt-3 position-relative z-index-1">
                    <Link href={`/blogs/${String(item.id)}`}>
                      <a className="d-block">
                        <Image
                          className="img-fluid border-radius-lg"
                          src={item.CoverImage.url}
                          height={300}
                          width={400}
                          layout="responsive"
                        />
                      </a>
                    </Link>
                  </div>

                  <div className="card-body pt-3">
                    <span className="text-gradient text-warning text-uppercase text-xs font-weight-bold my-2">
                      Blog
                    </span>
                    <Link href={`/blogs/${item.id}`}>
                      <a className="card-title h5 d-block text-darker">
                        {item.Title}
                      </a>
                    </Link>
                    <p className="card-description mb-4">
                      {item.Body.slice(0, 100) + "..."}
                    </p>
                    <div className="author align-items-center">
                      <div className="stats">
                        <small>Posted on {item.PublishDate}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Blog list section */}
    </>
  );
}

export const getStaticProps = async () => {
  const data = await fetch(`${process.env.STRAPI_URL}/auticare-blogs`);
  const blogList = await data.json();

  return {
    props: {
      blogList,
    },
    revalidate: 60,
  };
};
