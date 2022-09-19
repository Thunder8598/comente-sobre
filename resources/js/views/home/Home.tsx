import React from "react";
import Navbar from "../../components/navbar/Navbar";
import FormTopic from "./components/FormTopic";
import List from "./components/List";

class Home extends React.Component {
    render(): React.ReactNode {
        return (
            <main id="home">
                <Navbar />
                <FormTopic />
                <List />
            </main>
        );
    }
}

export default Home;