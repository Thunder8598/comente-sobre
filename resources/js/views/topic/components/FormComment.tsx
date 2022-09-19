import React from "react";

class FormComment extends React.Component {
    render(): React.ReactNode {
        return (
            <section className="form-comment">
                <form className="d-flex justify-content-between">
                    <div className="form-group">
                        <input type="text" name="comment" className="form-control" placeholder="Comentário" />
                    </div>
                    <button type="submit" className="btn btn-primary">Comentar</button>
                </form>
            </section>
        );
    }
}

export default FormComment;