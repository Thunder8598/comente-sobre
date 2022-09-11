import React from "react";
import Navbar from "../../components/navbar/Navbar";
import FormTopico from "./components/FormTopico";
import Listagem from "./components/Listagem";

class Home extends React.Component {
    render(): React.ReactNode {
        return (
            <main id="home">
                <Navbar />
                <FormTopico />
                <Listagem />
            </main>
        );
    }
}

export default Home;