import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";

const Data = [
  {
    id: 1,
    text: "Alex",
  },
  {
    id: 2,
    text: "Jonh",
  },
  {
    id: 3,
    text: "Mary",
  },
];

export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Text: "",
      Data: Data,
      idForobject: 0,
      isUpdate: false,
      error: false,
    };
  }

  handleText = (e) => {
    let val = e.target.value;
    this.setState({
      Text: val,
      error: false,
    });
  };

  handleAdd = () => {
    if (this.state.Text !== "") {
      if (this.state.isUpdate == true) {
        let obj = this.state.Data.filter((x) => x.id != this.state.idForobject);

        let newObj = {
          id: this.state.idForobject,
          text: this.state.Text,
        };

        let xyz = [...obj, newObj];
        let sorted = xyz.sort((a, b) => a.id - b.id);
        this.setState({
          Data: sorted,
          isUpdate: false,
          Text: "",
        });
      } else {
        let newId = this.state.Data[this.state.Data.length - 1].id;
        let newObject = {
          id: newId + 1,
          text: this.state.Text,
        };
        this.setState({
          Data: [...this.state.Data, newObject],
          Text: "",
        });
      }
    } else {
      this.setState({
        error: true,
      });
    }
  };

  handleUpdate = (id) => {
    let objectToUpdate = this.state.Data.filter((x) => x.id == id);

    this.setState({
      Text: objectToUpdate[0].text,
      idForobject: id,
      isUpdate: true,
    });
  };

  handleDelete = (id) => {
    let newData = this.state.Data.filter((x) => x.id != id);
    this.setState({
      Data: newData,
    });
  };

  render() {
    return (
      <div>
        <div>
          <h1
            style={{
              textAlign: "center",
              fontSize: "40px",
              marginTop: "80px",
            }}
          >
            <span style={{ color: "red" }}>CRUD </span>
            OPERATION
          </h1>
        </div>
        <div style={{ margin: "80px 0px" }}>
          <TextField
            style={{ width: "1000px", marginLeft: "90px" }}
            onChange={this.handleText}
            value={this.state.Text}
            variant="outlined"
            placeholder="Enter Text"
            error={this.state.error}
          />
          <Button
            style={{
              backgroundColor: "#2e7d32",
              color: "white",
              margin: "10px 70px",
              width: "90px",
            }}
            onClick={this.handleAdd}
            variant="outlined"
          >
            ADD
          </Button>
        </div>
        <div
          style={{
            border: "1px solid black",
            margin: "50px 90px",
            paddingBottom: "30px",
          }}
        >
          {this.state.Data.map((x) => (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "23px",
                  margin: "0px 90px",
                  marginTop: "20px",
                }}
              >
                <div style={{ display: "flex " }}>
                  <p
                    style={{
                      margin: "20px 40px",
                    }}
                  >
                    {x.id}
                  </p>
                  <p style={{ margin: "20px 40px" }}>{x.text}</p>
                </div>
                <div>
                  <Button
                    onClick={() => this.handleUpdate(x.id)}
                    style={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      margin: "20px 40px",
                    }}
                    variant="outlined"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => this.handleDelete(x.id)}
                    style={{
                      backgroundColor: "#d32f2f",
                      color: "white",
                      margin: "20px 40px",
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
