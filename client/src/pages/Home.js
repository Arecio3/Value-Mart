import '../styles/home.css'

const Home = ({theme}) => {
    return (
      <div className={theme === "dark" ? "home-container-dm" : "bg-white"}>
        Home
      </div>
    );
  }
  
  export default Home;
  