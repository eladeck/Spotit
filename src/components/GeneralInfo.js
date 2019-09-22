import React, { Component } from "react";
import Loader from "react-loader-spinner";
import GeneralInfoMaterialUI from "./GeneralInfoMaterialUI";
import axios from "axios";

class GeneralInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: null,
      airport: null
    };

    this.fetchInfoForPage = this.fetchInfoForPage.bind(this);
    this.getDefaultPicture = this.getDefaultPicture.bind(this);
  } // c'tor

  async componentDidMount() {
    await this.fetchInfoForPage();
  } // componentDidMount

  async componentDidUpdate(PrevProps) {
    console.log("GeneralInfo: componentDidUpdate(): PrevProps and props are");
    console.log(PrevProps);
    console.log(this.props);

    if (PrevProps.match.url !== this.props.match.url) {
      console.log("GeneralInfo: urls are different!");
      await this.fetchInfoForPage();
    }
  }

  async fetchInfoForPage() {
    try {
      console.log("in Airport.js: componentDidMount():  desired airport is:");
      let fieldValue = this.props.match.params.fieldValue;
      let fieldName = this.props.match.params.fieldName;
      console.log(`${this.props.match.params.fieldName}`);
      console.log(`${this.props.match.params.fieldValue}`);
      if (fieldName === "airport" && !fieldValue.includes("Airport")) {
        fieldValue = fieldValue.concat("Airport");
      }

      const searchValue = encodeURIComponent(fieldValue);
      console.log(`&&&&&`);
      const result = await axios(
        `https://cors-anywhere.herokuapp.com/en.wikipedia.org/w/api.php?action=opensearch&search=${searchValue}`
      );

      this.setState({
        data: { headline: result.data[1][0], detailedInfo: result.data[2] }
      });

      fetch(
        `/data/general/${fieldName}/${this.props.match.params.fieldValue}`,
        { method: "GET", credentials: "include" }
      )
        .then(res => res.json())
        .then(realImages => {

          this.setState({ images: realImages });
        })
        .catch(err => {
          console.log(
            "in Airport.js: componentDidMount(): in fetch->catch. errr is: "
          );
          console.log(err);
        });

      let url = "https://en.wikipedia.org/w/api.php";


      var params = {
        action: "query",
        prop: "images",
        titles: this.state.data.headline,
        format: "json"
      };

      url = url + "?origin=*";
      Object.keys(params).forEach(function(key) {
        url += "&" + key + "=" + params[key];
      });

      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(response => {
          let mainInfoImage = this.getDefaultPicture(fieldName);
          var pages = response.query.pages;

          for (var page in pages) {
            if (pages[page].images) {
              for (var img of pages[page].images) {
                // console.log(img.title);
                // console.log(typeof img.title);
                if (img.title.includes(params.titles)) {
                  mainInfoImage = encodeURIComponent(img.title);
                  mainInfoImage = `https://commons.wikimedia.org/wiki/Special:FilePath/${mainInfoImage}`;
                  break;
                }
              }
            }

            break;
          }

          // console.log(`main image url is: ${mainInfoImage}`);

          const detailedInfo =
            result.data[2].length === 0
              ? `No Information was found about ${this.props.match.params.fieldValue} ${fieldName}`
              : result.data[2];
          const headline =
            result.data[1][0].length === 0
              ? `${this.props.match.params.fieldValue}`
              : result.data[1][0];
          this.setState({
            data: { imageUrl: mainInfoImage, headline, detailedInfo }
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    } catch (err) {
      console.log(
        "in Airport.js: componentDidMount(): in catch section. Error is:"
      );
      console.log(err);
    }
  }

  getDefaultPicture(fieldName) {
    let url = "";
    switch (fieldName) {
      case "airport":
        url = "/defaultPicturesToBeDisplayed/defaultAirport.jpg";
        break;
      case "airline":
        url = "/defaultPicturesToBeDisplayed/defaultAirline.jpg";
        break;
      case "airplaneModel":
        url = "/defaultPicturesToBeDisplayed/defaultAirline.jpg";
        break;
      case "city":
        url = "/defaultPicturesToBeDisplayed/defaultCity.jpg";
        break;
      default:
        url = "/defaultPicturesToBeDisplayed/defaultAirport.jpg";
        break;
    }

    return url;
  }

  render() {
    console.log(`in render of Airport`);
    const pageType = window.location.pathname.split("/")[2];

    return (
      <>
        {this.state.data && this.state.images ? (
          <GeneralInfoMaterialUI
            data={this.state.data}
            loggedInUser={this.props.loggedInUser}
            images={this.state.images}
          />
        ) : (
          <div style={{ position: "fixed", left: "48%", top: "40%" }}>
            <Loader type="TailSpin" color="lightblue" height={40} width={40} />
          </div>
        )}
      </>
    );
  } // render
} // class

export default GeneralInfo;