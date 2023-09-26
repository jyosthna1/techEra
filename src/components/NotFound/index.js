import './index.css'
import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
        className="not-found"
      />
      <h1 className="not-found-head">Page Not Found</h1>
      <p className="not-description">
        We are sorry, the page you requested could not be found.
      </p>
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  </>
)

export default NotFound
