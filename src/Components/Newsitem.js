import React from 'react'

const NewsItem =(props)=>{
    let { title, description, imgurl, newsurl, date } = props;
    return (
      <div className='my-4'>
        <div className='col-my-4'>
          <div className='row-md-4'>
            <div className="card" style={{ width: "20rem" }}>
              <div style={{
                left: '67%',
                justifyContent: 'flex-end',
                display: 'flex',
                position: 'absolute'
              }}>
                <span className="badge rounded-pill bg-danger">
                  {new Date(date).toDateString()}
                </span>
              </div>
              <img
                src={!imgurl ? 'https://c.biztoc.com/p/5dcf24e21cba97e9/s.webp' : imgurl}
                alt="..." />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default NewsItem