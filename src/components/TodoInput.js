import React, { Component } from 'react';
import './component_style.css'

export default class TodoInput extends Component {
    handleChange = (event) => {
        const { handleChange } = this.props;
        handleChange(event);
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    render() {
        const { item, handleSubmit, editItem } = this.props;

        return (
            <div className="card card-body my-3">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <div className="input-group-prepend">
                        </div>

                        <textarea
                            style={{ overflow: 'hidden', resize: 'none' }}
                            className="form-control"
                            placeholder="Add something..."
                            value={item}
                            onChange={this.handleChange}
                            rows={1}
                        />
                    </div>

                    <div className="d-flex justify-content-center">
                        <button 
                            type="submit"
                            className={`btn btn-block mt-3 ${editItem ? 'btn-success' : 'btn-info'}`}
                        >
                            {editItem ? 'Edit task' : 'Add New Task'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
