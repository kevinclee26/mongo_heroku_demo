<!-- Find and Replace All mongo_heroku_demo -->
<!-- Replace [product-screenshot] [product-url] -->
<!-- Other Badgets https://naereen.github.io/badges/ -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![Deployment][heroku-shield]][product-url]
<!-- [![License][license-shield]][license-url] -->

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/kevinclee26/mongo_heroku_demo">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">mongo_heroku_demo</h3>

  <p align="center">
    A demostration of MongoDB + Flask -> Heroku using SpaceX Mission Data
    <br />
    <a href="https://github.com/kevinclee26/mongo_heroku_demo"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://mongo-heroku-demo.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/kevinclee26/mongo_heroku_demo/issues">Report Bug</a>
    ·
    <a href="https://github.com/kevinclee26/mongo_heroku_demo/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
	<!-- <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]][product-url]
This project originally started as a demonstration of building a Web Application to store and expose Data stored in a MongoDB Cluster via a Web API. 

The project expanded to building out a Web Application that consumes Data from said API. 

The Data comes from an open-source API related to SpaceX Launch Missions. 

Big Thanks to the people at SpaceX for Inspiring the Future of Exploration

### Built With

<!-- This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples. -->

* [Python](https://www.python.org/)
* [Flask](https://flask.palletsprojects.com)
* [PyMongo](https://pymongo.readthedocs.io)
* [MongoDB](https://www.mongodb.com/)
* [D3](https://d3js.org/)

<!-- GETTING STARTED -->
## Getting Started

<!-- This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps. -->

The Web Application is hosted by Heroku - check it out [here][product-url]. 
Basic instructions available below to get a local copy up and running. 

### Prerequisites

<!-- This is an example of how to list things you need to use the software and how to install them. -->
* Python
* Flask
* PyMongo

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kevinclee26/mongo_heroku_demo.git
   ```
2. Install pip (package installer for Python)
   [here](https://pip.pypa.io/en/stable/installing/)
3. Install Python packages
   ```sh
   pip install requests
   pip install flask
   pip install pymongo
   ```

<!-- USAGE EXAMPLES -->
## Usage

<!-- Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources. -->
The Web Application Provides A History as well as Links to Wikipedia Page and Youtube Videos for Every SpaceX Launch Mission. 

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/kevinclee26/mongo_heroku_demo/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
<!-- ## License

Distributed under the MIT License. See `LICENSE` for more information.
 -->

<!-- CONTACT -->
## Contact

Kevin Lee - [@kevin-c-lee26][linkedin-url] - kevin.c.lee26@gmail.com

Project Link: [https://github.com/kevinclee26/mongo_heroku_demo](https://github.com/kevinclee26/mongo_heroku_demo)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [SpaceX](https://www.spacex.com/)
* [SpaceX API](https://docs.spacexdata.com/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/kevinclee26/mongo_heroku_demo.svg?style=for-the-badge
[contributors-url]: https://github.com/kevinclee26/mongo_heroku_demo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/kevinclee26/mongo_heroku_demo.svg?style=for-the-badge
[forks-url]: https://github.com/kevinclee26/mongo_heroku_demo/network/members
[stars-shield]: https://img.shields.io/github/stars/kevinclee26/mongo_heroku_demo.svg?style=for-the-badge
[stars-url]: https://github.com/kevinclee26/mongo_heroku_demo/stargazers
[issues-shield]: https://img.shields.io/github/issues/kevinclee26/mongo_heroku_demo.svg?style=for-the-badge
[issues-url]: https://github.com/kevinclee26/mongo_heroku_demo/issues
<!-- [license-shield]: 
[license-url]:  -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/kevin-c-lee26/
[product-screenshot]: https://github.com/kevinclee26/mongo_heroku_demo/blob/main/static/img/sample_small.png?raw=true
[product-url]: https://mongo-heroku-demo.herokuapp.com/
[heroku-shield]: https://img.shields.io/badge/%E2%86%91_Deploy_to-Heroku-7056bf.svg?style=for-the-badge