import React from "react";
import { useNavigate } from "react-router-dom";
import MemberDetail from "./MemberDetail";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div id="homepagetop">
        <div className="homepage-container" id="heading-container">
          <h1>An Investigation into Melbourne Liveability</h1>
          <h3>A COMP90024 Cluster and Cloud Computing Project</h3>
          <button
            className="redirect-button"
            onClick={() => {
              navigate("/map");
            }}
          >
            Explore
          </button>
        </div>
      </div>
      <div id="homepagemid">
        <div className="homepage-container--wide">
          <div id="info">
            <h1>About</h1>
            <p>
              The topic of liveability has gained significant attention through
              social media platforms over the recent years. Nowadays, Twitter is
              one of the most popular online social media platforms, where users
              can share and communicate their opinions with each other from all
              over the world. Given the increasing popularity and importance of
              online social media networks such as Twitter, it is not surprising
              that a tremendous amount of sharing and discussion of information
              has occurred in such platforms.
              <br />
              <br />
              With respect to the indicators of Melbourne housing and
              opportunity, the objective of the scenario that was chosen for
              this assignment was to analyze the liveability of Melbourne by
              harvesting tweets. Meanwhile, statistical data could be downloaded
              from the Australian Urban Research Infrastructure Network (AURIN)
              and thereby be used to compare with the twitter data.
            </p>
          </div>
          <div id="melmap"></div>
        </div>
      </div>
      <div id="homepagebottom">
        <div className="homepage-container member-container">
          <MemberDetail
            name="Rui Wang"
            sid="1091883"
            degree="Master of Data Science"
            role="Ansible Developer"
          />
          <MemberDetail
            name="Zhaopeng Li"
            sid="983522"
            degree="Master of Data Science"
            role="Twitter Harvest Developer"
          />
          <MemberDetail
            name="Yuer Zhu"
            sid="1249671"
            degree="Master of Data Science"
            role="Data Analyst"
          />
          <MemberDetail
            name="Linyan Zhu"
            sid="1074009"
            degree="Master of Computer Science"
            role="Full-Stack Engineer"
          />
          <MemberDetail
            name="Yifei Du"
            sid="1260227"
            degree="Master of Computer Science"
            role="Full-Stack Engineer"
          />
        </div>
      </div>
      <div id="homepageref">
        <div className="homepage-container">
          <h3>References</h3>
          <p>
            Top background: Photo by{" "}
            <a href="https://unsplash.com/@jmsdono?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              James Donovan
            </a>{" "}
            on <a href="https://unsplash.com/photos/0ZBRKEG_5no">Unsplash</a>
          </p>
          <p>
            Mid background: Photo on{" "}
            <a href="https://www.purenbrightcleaning.com.au/contact-us">here</a>
          </p>
          <p>
            Bottom background: Photo by{" "}
            <a href="https://unsplash.com/@lishakov?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Andrej Lišakov
            </a>{" "}
            on <a href="https://unsplash.com/photos/V2OyJtFqEtY">Unsplash</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
