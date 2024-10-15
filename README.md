# Student Life Support Service - (Ticketing system web-based)

<a id="readme-top"></a>



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
![version](https://img.shields.io/badge/version-1.0.0-blue)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC_BY_4.0-lightblue.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Docker](https://img.shields.io/badge/built_with-Docker-2496ED?logo=docker&logoColor=fff)](#)
[![GitHub issues closed](https://img.shields.io/github/issues-closed/vhtua/student-life-support-service.svg?color=green)](https://github.com/vhtua/student-life-support-service/issues?q=is%3Aissue+is%3Aclosed) 
[![GitHub issues open](https://img.shields.io/github/issues/vhtua/student-life-support-service.svg?)](https://github.com/vhtua/student-life-support-service/issues?q=is%3Aissue+is%3Aopen) 
[![Issues](https://img.shields.io/github/issues/vhtua/student-life-support-service/bug.svg?color=orange)](https://github.com/vhtua/student-life-support-service/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug)

<!-- [![Docker](https://img.shields.io/badge/dockerhub-images-important.svg?logo=Docker)](https://www.docker.com/) -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/vhtua/student-life-support-service">
    <img src="doc/images/app-logo.png" alt="Logo" width="50%" >
  </a>

  <h3 align="center">VGU Student Life Support Service</h3>

  <p align="center">
    An application designed to assist students with their daily activities at VGU
    <br />
    <a href="/doc/1403143-Report.pdf"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://youtu.be/st43ih3POvk">View Demo</a>
    ·
    <a href="https://github.com/vhtua/student-life-support-service/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/vhtua/student-life-support-service/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#business-requirements">Business Requirements</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#system-architecture">System Architecture</a></li>
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
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![App Screen Shot][product-screenshot]]()

The Student Life Support Service is a web application developed to streamline student support processes at the Vietnamese-German University (VGU). The system addresses the needs of students, dormitory staff, and administrators by facilitating efficient communication and ticket management for daily student life issues.

The key objectives of this project are to:
* enhance student-staff interaction
* simplify ticket resolution
* improve the overall support experience

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Business Requirements

| **User Roles**                        | **Functional Requirements**                                                                                                                                       |
|---------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Student                               | - can view, update his/her personal information.  <br> - can create (raise), view his/her support tickets.  <br> - can contact the staff who handles the support ticket through text messages.  <br> - can rate his/her tickets which are marked as done.  <br> - can view newsfeed (public pending/in process tickets).  <br> - can view notifications, announcement.  <br> - can give feedback and suggestions for the system.  |
| Dormitory staff/ Student Affairs      | - can view, update his/her personal information.  <br> - can view all available support tickets.  <br> - can handle support tickets (mark as done, cancelled).  <br> - can view all past handled tickets.  <br> - can contact students who own the ticket through text messages.  <br> - can view newsfeed (public pending/in process tickets).  <br> - can create, view notifications, announcement.  <br> - can give feedback and suggestions for the system.  |
| Admin (Operator)                     | - can manage his/her personal information (view, update).  <br> - can manage all users/roles (create, view, update, delete).  <br> - can manage all support tickets (view, delete).  <br> - can manage all dormitories (create, view, delete).  <br> - can manage system logs (view, delete).  <br> - can manage system feedback (view, delete).  <br> - can view newsfeed (public pending/in process tickets).  <br> - can manage notifications, announcement (create, view).  <br> - can view the system report.  |



<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

#### Languages
[![HTML][HTML.html]][HTML-url]
[![CSS][CSS.css]][CSS-url]
[![JavaScript][JavaScript.js]][JavaScript-url]
![Shellscript][Shellscript.sh]
#### Frameworks
[![NodeJs][NodeJs.js]][NodeJs-url]
[![React][React.js]][React-url]
![MaterialUi][MaterialUi.js]
[![Bootstrap][Bootstrap.com]][Bootstrap-url]
![Express][Express.js]

#### Database
![Postgresql][Postgresql.db]
![Redis][Redis.js]

#### Tools
![Vite][Vite.js]
[![Docker][Docker.dockerfile]][Docker-url] 


<p align="right">(<a href="#readme-top">back to top</a>)</p>



## System Architecture

The system follows a three-tier architecture, consisting of the following layers:

<img src="doc/images/three-tier-architecture.svg" alt="Logo" width="70%" >

  - **Presentation Layer (Client):**
    Handles all interactions with the user. Implements the user interface using ReactJS and Material UI. Communicates with the server through RESTful API calls and SocketIO for real-time features. Responsible for rendering components, collecting user input, and displaying data received from the backend.  

  - **Business Logic Layer (Server):**
    NodeJS and ExpressJS handle the core business logic, such as processing support ticket requests, authenticating users, managing roles, and communicating with the database. SocketIO is used to manage real-time messaging between students and staff. Implements security features like JWT-based authentication and session management using Redis.

 - **Data Layer (Database):**
    PostgreSQL stores all persistent data, including user profiles, support tickets, messages, and system logs. The server communicates with the database using SQL queries to retrieve, create, update, and delete records. Ensures data consistency and integrity by enforcing constraints, foreign keys, and relationships.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started
To get a local copy up and running application, please follow these steps.

### Prerequisites
You could choose between using Docker Engine or not

* Using Docker 
    
    [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](#)

    Here are recommended system specification for the smoothly running of the application if you decide to use Docker Engine

    | Components        | Description                       | 
    | -----------       | -----------                       | 
    | CPU               | 64-bit, $\ge$ 4 cores, 2.0 GHz    |
    | RAM               | $\ge$ 8 GB                        |
    | Storage           | SSD (recommend), $\ge$ 6 GB free space  |

    Make sure that your system meets the requirements above before downloading the Docker Engine

    | Service name      | Version                    | URL       |
    | -----------       | -----------                | -----         |
    | Docker Engine     | $\ge$ 27.1.1 build 6312585 |[Download link](https://www.docker.com)  |


    

* Not using Docker
  
    If your system does not meet the requirements for using Docker Engine, you could consider manually install all environments on your local machine then launch all services

    | Service name      | Version                           | URL       |
    | -----------       | -----------                       | -----         |
    | Node.js           | $\ge$ v20.12.2                    | [Download link](https://nodejs.org/en)              |
    | PostgreSQL        | 16.4                              | [Download link](https://www.postgresql.org/download/)  |
    | Redis             | 5.0.14.1                          | [Download link](https://redis.io/downloads/) or [x64-win](https://github.com/tporadowski/redis/releases)    |
    
    and any Web Browser: Google Chrome (Recommended), Firefox, Microsoft Edge, Chromium, Brave, Opera  

### Installation
You could choose between using Docker Engine or not

#### Clone the repository 

   - SSH

       ```shell
       git clone git@github.com:vhtua/student-life-support-service.git
       ```

   or

   - HTTPS

       ```shell
       git clone https://github.com/vhtua/student-life-support-service.git
       ``` 

   or simply download the .zip file

> [!NOTE]
> Then you can choose between using Docker or not for setting up the application.



#### Using Docker
Make sure that Docker Engine is successfully installed and currently running on the system. 

1. Navigate to the root folder of the project, locate ```build.ps1``` file (or ```build.sh```)

2. Monitor all current listening TCP ports on the local machine by executing ```list_ports``` script

- For Windows (Using Powershell)

    ```powershell
    ./list_ports.ps1
    ```

- For Linux (Using Bash shell)

    ```sh
    sudo chmod +x list_ports.sh
    sudo ./list_ports.sh
    ```

3. Modify all necessary service ports in ```.env.dev``` file so that they do not conflict with all running TCP ports in the local system.

4. Navigate to ```client``` and ```server``` directories, adjust their ```.env``` files

> [!NOTE]  
> For server: Rename the file ```.default.env``` to ```.env```


1. Launch app building script by using this command:

- For Windows (Using Powershell)

    ```powershell
    ./build.ps1
    ```

- For Linux (Using Bash shell)

    ```sh
    sudo chmod +x build.sh
    sudo ./build.sh
    ```


#### Not using Docker


1. Set up PostgreSQL Database

> [!IMPORTANT]  
> Make sure that PostgreSQL is successfully installed and currently running on the system. 

- Locate any ```.sql``` file (Recommend file name ```vgusls_db_20241006_172939.sql```) inside [server/database](server/database) directory and then restore it into the database you created.


2. Set up Redis
> [!IMPORTANT]  
> Make sure that Redis is successfully installed and currently running on the system. 

- For basic management, locate [server/redis](server/redis) directory and then execute the ```run``` script depends on the operating systems of the local machine.



3. Launch Frontend Service

> [!IMPORTANT]
> Make sure that ```Node.js``` is successfully installed and currently running on the system. 

- Navigate the [client](client/) directory and then executing the following command to install all necessary packages for front-end service:

  ```shell
  npm install
  ```

- Launch front-end service:

  ```shell
  npm run start
  ```

4. Launch Backend Service

> [!IMPORTANT]
> Make sure that ```Node.js``` is successfully installed and currently running on the system. 


- Navigate the [server](server/) directory and then executing the following command to install all necessary packages for back-end service:

  ```shell
  npm install
  ```

- Rename the file ```.default.env``` to ```.env```. Then match all the environment variables of the ```.env``` file with all existing service variables in the local system. For E.g: 

  ```js
  PG_DB_USER=postgres
  PG_DB_PASSWORD=your_password
  PG_DB_HOST=localhost
  PG_DB_PORT=5432
  PG_DB_DATABASE=vgusls_db
  ```

- After that, launch back-end service:

  ```shell
  npm run start
  ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

_For more details, please refer to the [Thesis Report](/doc/1403143-Report.pdf)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the CC-BY-4.0 License. See [LICENSE](LICENSE) for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Vu Hoang Tuan Anh 
- Facebook: [@tuananh020402](https://www.facebook.com/tuananh020402/) 
- Email: vhtuananh020402@gmail.com


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

First and foremost, I would like to extend my heartfelt gratitude to my two supervisors, Dr. Tran Hong Ngoc and Dr. Truong Dinh Huy, for dedicating their valuable time and effort to review and provide feedback on my thesis. Working closely with Dr. Tran Hong Ngoc over the years has made me appreciate her constant enthusiasm and approachable nature, which significantly boosted my confidence and comfort in completing this work. She was always available to offer guidance and constructive feedback whenever I needed assistance.

Moreover, I am also deeply thankful to the dedicated Computer Science and Engineering (CSE) assistants, whose thorough guidance throughout the thesis process and patience in addressing my questions were invaluable to my research.

Lastly, I want to express my sincere appreciation to all the lecturers at Vietnamese-German University (VGU) and Frankfurt University of Applied Sciences, whose teachings and guidance have been instrumental in shaping my academic journey. I am also incredibly grateful to my friends and family, whose unwavering support and encouragement have been a constant source of strength throughout my four years of study.

```Love you, VGU and FraUAS ❤️```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[HTML.html]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[HTML-url]: https://html.spec.whatwg.org/
[CSS.css]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS-url]: https://www.w3.org/TR/CSS/#css
[JavaScript.js]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://www.ecma-international.org/publications-and-standards/standards/ecma-262/
[Shellscript.sh]: https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white
[NodeJs.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[NodeJs-url]: https://nodejs.org/
[MaterialUi.js]: https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Postgresql.db]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[Redis.js]: https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white
[Vite.js]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white
[Docker.dockerfile]: https://img.shields.io/badge/Docker-0377FC?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: doc/images/app-screenshot1.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 