import React, {useEffect, useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=>{

  const[articles, setArticles] = useState([])
  const[loading, setLoading] = useState(true)
  const[page, setPage] = useState(1)
  const[totalResults, setTotalResults] = useState(0)
  //document.title=`BitNews - ${this.capitalizeFirstLetter(props.category)}`

  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews= async()=>{
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json()
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - BitNews`;
    updateNews();
    // eslint-disable-next-line
  },[]);


// const handlePrevClick = async ()=>{
//     setPage(page-1)
//     updateNews()

// }
// const handleNextClick = async ()=>{
//   setPage(page+1)
//   updateNews()
//   }

const fetchMoreData = async () => {
  setPage(page+1)
  updateNews()
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  setLoading(true)
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  setArticles(articles.concat(parsedData.articles))
  setTotalResults(parsedData.totalResults)
  };

    return (
      <>
        <h1 className='text-center' style={{ marginTop: '105px' }}>TOP HEADLINES - {capitalizeFirstLetter(props.category)}</h1>
        {loading && <Spinner/>}
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className='row my-4'>
        {articles.map((element)=>{
          return <div className='col md-4' key={element.url}>
            <Newsitem title={element.title} description={element.description} 
            imgurl={element.urlToImage} newsurl={element.url} date={element.publishedAt}/>
        </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between">
        {/* <button disabled={page<=1} type="button" className="btn btn-success" onClick={handlePrevClick}> &larr; Previous</button>
        <button disabled={page+1>Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-success" onClick={handleNextClick}>Next &rarr;</button> */}
        </div>
      </>
    )
}
News.defaultProps={
  country: 'in',
  category: 'general',
  pagesize: 6
}

News.propTypes={
  country: PropTypes.string,
  category: PropTypes.string,
  pagesize: PropTypes.number,
}

export default News
