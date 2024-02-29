import React from 'react'
import { Container } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="footer border-top px-sm-2 py-2">
      <Container fluid className="text-center align-items-center flex-column flex-md-row d-flex justify-content-between">
        <div>
          <a className="text-decoration-none" href="#">Resume Tailor  </a>
          <a className="text-decoration-none" href="#">
       PRO
          </a>
          {' '}
          © 2024 Reserved
        </div>
        <div className="ms-md-auto text-muted font-size-smaller font-weight-lighter">
          Powered by&nbsp;
          <a
            className=" text-decoration-none text-muted"
            href="syberspace.com.ng"
          >
      syberspace
          </a>
        </div>
      </Container>
    </footer>
  )
}
