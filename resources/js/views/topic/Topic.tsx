import React from "react";
import Navbar from "../../components/navbar/Navbar";
import FormComment from "./components/FormComment";
import List from "./components/List";

class Topic extends React.Component {
    render(): React.ReactNode {
        return (
            <main id="topic">
                <Navbar/>
                <FormComment/>
                <List/>
            </main>
        );
    }
}

export default Topic;