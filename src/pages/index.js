import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Article = styled.article`
  width: 66.67%;

  @media(max-width: 765px) {
    width:100%;
  }
`

const PostInnerContent = styled.div`
  background-color: white;
  padding: 45px 50px;
  border: 1px solid #dadada;
  border-top: none;

  h2 {
    margin:0;
  }
`

const FeaturedImageWrapper = styled.div`
  line-height: 1;
  max-height: 400px;
  overflow: hidden;

  img {
    width: 100%;
  }
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      {/* <Bio /> */}
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <Article
                itemScope
                itemType="http://schema.org/Article"
              >
                <FeaturedImageWrapper>
                  <StaticImage 
                    src={post.frontmatter?.featuredImage?.publicURL}
                    width="100%"
                  />
                  <img src={post.frontmatter?.featuredImage?.publicURL} />
                </FeaturedImageWrapper>
                <PostInnerContent>
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                      />
                  </section>
                </PostInnerContent>
              </Article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          featuredImage {
            publicURL
          }
        }
      }
    }
  }
`
