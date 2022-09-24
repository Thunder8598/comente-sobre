import React from "react";
import Navbar from "../../components/navbar/Navbar";
import FormTopic from "./components/FormTopic";
import TopicList from "./components/TopicList";

class Home extends React.Component {
    render(): React.ReactNode {
        return (
            <main id="home">
                <Navbar />
                <FormTopic />
                <TopicList />
            </main>
        );
    }
}

export default Home;