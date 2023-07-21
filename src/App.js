import './App.css';
import logo from './Images/logo.svg';
import logoVertical from './Images/logoVertical.svg';
import poster from './Images/poster.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

function App() {

  const nFormatter = (num, digits = 0) => {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  };

  const [hasLiked, setHasLiked] = useState("No");
  const [counts, setCounts] = useState({
    "visits": -1,
    "downloads": -1,
    "likes": -1,
    "reads": -1
  });
  const getData = (func, keywrd, optionalArg = "") => {
    let xhrViews = new XMLHttpRequest();
    xhrViews.open("GET", `https://api.countapi.xyz/${func}/kavinimantran/${keywrd}${optionalArg}`);
    xhrViews.responseType = "json";
    xhrViews.onload = function () {
      setCounts((prev) => {
        return {
          ...prev,
          [keywrd]: this.response.value,
        };
      });
    };
    xhrViews.send();
    return counts[keywrd];
  };
  useEffect(() => {
    getData("hit", "visits");
    getData("get", "downloads");
    getData("get", "likes");
    getData("get", "reads");
    const liked = localStorage.getItem('liked');
    if (liked === "Yes") {
      setHasLiked("Yes");
    }
  }, []);



  return (
    <div className="App">
      <div className="left-design-vertical-banner">
        <img src={logoVertical} className="App-logo" alt="logo" id='verticalLogo' />
        <img src={logo} className="App-logo" alt="logo" id='horizontalLogo' />
        <h1 className="title">Kavi Nimantran</h1>

      </div>
      <div className="landing-page">
        <div className="desc">
          <div className="sec">
            <div className="hd2">Read Now</div>
            <div className="cnt">
              <ul className="statistics">
                <li>
                  <FontAwesomeIcon icon={faEye} /> &nbsp; : &nbsp;
                  {"25k+"}
                </li>
                <li>
                  <FontAwesomeIcon icon={faThumbsUp} /> &nbsp; : &nbsp;
                  {"12k+"}
                </li>
                <li>
                  <FontAwesomeIcon icon={faBookOpen} /> &nbsp; : &nbsp;
                  {"17k+"}
                </li>
                <li>
                  <FontAwesomeIcon icon={faDownload} /> &nbsp; : &nbsp;
                  {"10k+"}
                </li>
              </ul>
              <div className="btn cnt">
                <a onClick={() => getData("hit", "reads")} href="https://heyzine.com/flip-book/09978ac5de.html" target="_blank" rel="noreferrer"> <button className='cnt btn'>Read Now  &nbsp;&nbsp; <FontAwesomeIcon icon={faBookOpen} className='icon' />
                </button></a>
                <a onClick={() => getData("hit", "downloads")} download={true} href="./Assets/Kavi Nimantran Sample.pdf"> <button className='cnt btn'>Download Now &nbsp; &nbsp; <FontAwesomeIcon icon={faDownload} className='icon' />
                </button></a>
              </div>
              <i className="like">
                Loved it? Plz let me know by dropping a like {":)"}
                <button
                  onClick={() =>

                    setHasLiked(prev => {
                      if (prev === "No") {
                        localStorage.setItem('liked', "Yes");
                        getData("hit", "likes");
                        return "Yes";
                      }

                      localStorage.removeItem('liked');
                      getData("update", "likes", "?amount=-1");
                      return "No";


                    })
                  }
                  className={`cnt btn ${hasLiked === "Yes" ? "liked" : ""}`}> <FontAwesomeIcon icon={faThumbsUp} className='icon' /></button>
              </i>
            </div>
          </div>
          <hr className="sec-sep" />
          <div className="sec">
            <div className="hd2">About the Book</div>
            <div className="cnt">
              Kavi Nimantran, which translates to Poet's Invitation, is a collection of a few of the earliest and finest poems of Shivansh. With a deep interest in literature and the Hindi language from an early age, Shivansh started his poetical journey at the age of 13. With an imaginative mind and constant support and guidance from teachers, he composed poems ranging from motivational to nature admiring which have been published in local and national magazines.
            </div>
          </div>
          <hr className="sec-sep" />

          <div className="sec">
            <div className="hd2">About the Poet</div>
            <div className="cnt">
              Shivansh Shalabh is a 18 yr. old high school student from Kolkata. He is a budding entrepreneur and a full-stack web developer.
              <br />
              Creating a change in society is what drives him towards technopreneurship and volunteering. He currently has two startups running at micro levels in the field of education and social good. He started his journey of change-making in his tenth grade and over the course of 2 yrs. he has impacted hundreds of life and received national recognition from prestigious organizations like Google for his initiatives.
              <br />

              He actively engages with the youths and educates them with the required skills as he believes they are our future. He is part of the events team of Rise Global Community, a community of 4k+ young changemakers from around the globe, where he organizes events and interacts with young people. He also organizes weekly sessions in his locality where he teaches full-stack web development to school students.
              <br />

              He also has a great interest in Hindi literature and writing poems is one of his hobbies. His book ‘Kavi Nimantran’, a collection of his finest poems, has gained likes of over 20k readers.
              <br />

              Shivansh is an ambitious youth with a hunger for learning and exploration. He loves taking up challenges and is looking forward to playing his part in shaping the future of India.

            </div>
          </div>
          <hr className="sec-sep" />
        </div>
        <img src={poster} className="poster" alt="logo" />
      </div>
    </div>
  );
}

export default App;

// https://api.countapi.xyz/create?namespace=kavinimantran&key=visits&value=0
