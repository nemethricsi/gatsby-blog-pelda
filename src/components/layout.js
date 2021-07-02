import * as React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

const Header = styled.header`
  height: 90px;
  background-color: #363636;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const LogoTitle = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  color: #dadada;
  max-width: 970px;
  margin: 0 auto;
  padding: 0 15px;
`

const GlobalWrapper = styled.div`
  max-width: 970px;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
`

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  // if (isRootPath) {
  //   header = (
  //     <h1 className="main-heading">
  //       <Link to="/">{title}</Link>
  //     </h1>
  //   )
  // } else {
  //   header = (
  //     <Link className="header-link-home" to="/">
  //       {title}
  //     </Link>
  //   )
  // }

  return (
    <>
      <Header>
        <LogoTitle to="/">Jamstack</LogoTitle>
      </Header>
      <GlobalWrapper>
        {/* <header className="global-header">{header}</header> */}
        <main>{children}</main>
        {/* <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer> */}
      </GlobalWrapper>
    </>
  )
}

export default Layout
