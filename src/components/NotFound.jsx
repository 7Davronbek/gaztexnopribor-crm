import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="NotFound py-5 text-center">
      <div className="container">
        <div className="row">
            <div className="col-12">
                <h4>PAGE NOT FOUND. <Link  className="border-bottom text-danger" to='/'>GO HOME PAGE</Link></h4>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
