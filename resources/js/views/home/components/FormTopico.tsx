import React from "react";

class FormTopico extends React.Component {
    render(): React.ReactNode {
        return (
            <section className="form-topico">
                <form className="d-flex justify-content-between">
                    <div className="form-group">
                        <input type="text" name="topico" className="form-control" id="txt-topico" placeholder="Crie um novo tópico" />
                    </div>
                    <button type="submit" className="btn btn-primary">Criar</button>
                </form>
            </section>
        );
    }
}

export default FormTopico;