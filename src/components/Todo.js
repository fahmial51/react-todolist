import React, { Component  } from "react";

class Todo extends Component {
    componentDidMount(){
        let data = [];
        const localData = JSON.parse(localStorage.getItem('data'));
        if (localData != null) {
            data = localData;
        }
        this.setState({
            database: data
        })
    }

    state = {
        database: [],
        input: ''
    };

    handleChange = (e)=> {
        this.setState({
            input: e.target.value
        })
    }

    handleKeyUp = (e)=> {
        if(e.key === 'Enter'){
            this.addData()
        }
    }

    addData = ()=> {
        const job = {
            name: this.state.input,
            status: false
        };
        const data = this.state.database;
        
        data.push(job)
        
        localStorage.setItem('data', JSON.stringify(data))

        this.setState({
            database: data,
            input: ''
        })
    }

    deleteList = (dataId) => e => {
        const data = this.state.database;
        data.splice(dataId, 1)
        this.setState({
            database: data,
        })
        localStorage.setItem('data', JSON.stringify(data));
    }

    changeStatus = dataId => e =>{
        const data = this.state.database;

        if(data[dataId].status === true) {
            data[dataId].status = false;
        } else {
            data[dataId].status = true
        }

        this.setState({
            database: data
        })
        localStorage.setItem('data', JSON.stringify(data));
        
    }
    
    render(){
        return (
            <div>
                <h1>Simple To Do List Using React JS</h1>

                <div className="form-inline justify-content-center">
                    <input id="job-input" className="form-control" width="300" type="text" name="job" value={this.state.input} placeholder="+ Tambahkan tugas" onChange={this.handleChange} onKeyUp={this.handleKeyUp} />
                    <button className="btn btn-info" type="button" name="tambah" id="add-btn" onClick={this.addData}>Tambah</button>
                </div>

                <div className="container list-container">
                    <br />
                    <ol id="job-list" className="list-group">
                        {this.state.database.map((data, i) => {
                            return <li className="list-group-item" id={i} key={i}><div className={"float-left "+ (data.status === true ? 'is-done':'')} onClick={this.changeStatus(i)}><input className="checkbox" type="checkbox" checked={data.status} title="Tandai sudah selesai" /> {data.name} </div><button className="btn btn-danger float-right delete-list" onClick={this.deleteList(i)} title="Hapus tugas">x</button></li> 
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}
export default Todo;