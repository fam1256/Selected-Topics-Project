import Axios from "axios";
import { useState } from "react";
import'./App.css';

function App() {

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("");
  const [newName, setNewName] = useState("");
  const [fidList, setFidList] = useState([]);

  const getFid = () => {
    Axios.get("http://localhost:3001/images").then((response) => {
      setFidList(response.data);
    });
  };

  const getFidPhotograph = () => {
    Axios.get("http://localhost:3001/Photograph").then((response) => {
      setFidList(response.data);
    });
  };

  const getFidDrawing = () => {
    Axios.get("http://localhost:3001/Drawing").then((response) => {
      setFidList(response.data);
    });
  };


  const addFid = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      url: url,
      type: type,
    }).then(() => {
      setFidList([
        ...fidList,
        {
          name: name,
          url: url,
          type: type,
        },
      ]);
    });
  };

  const updateFidname = (id) => {
    Axios.put("http://localhost:3001/update", { name: newName, id: id }).then(
      (response) => {
        setFidList(
          fidList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: name,
                  url: url,
                  type: type,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteFID = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setFidList(
        fidList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
    <center><h1> Image Storage </h1></center>
    <br/>
    <div className="information">
      <form action="">
        <div className="mb-3">
            <label className="form-label" htmlFor="name">
            &nbsp;&nbsp;Credit:&nbsp;
            </label>
            <input
              type="text"
              className=""
              placeholder="Enter name"
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
        </div>
        <div className="mb-3">
            <label className="form-label" htmlFor="url">
            &nbsp;&nbsp;URL:&nbsp;&nbsp;&nbsp;&nbsp;
            </label>
            <input
              type="text"
              className=""
              placeholder="Enter url"
              onChange={(event) => {
                setUrl(event.target.value)
              }}
            />
        </div>
        <div className="mb-3">
            <label className="form-label" htmlFor="type">
            &nbsp;&nbsp;Type:&nbsp;&nbsp;&nbsp;
            </label>
            <select name="dropms" onChange={(event) => {
                setType(event.target.value)
              }} >
              <option>Photograph</option>
              <option>Drawing</option>
            </select>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <button class="btn btn-success" onClick={addFid}>
          Add Image
        </button>
      </form>
    </div>
    <hr/>
    <div className="image">
    &nbsp;&nbsp;&nbsp;
      <button class="btn btn-primary" onClick={getFid}>
        Show All Image
      </button>
      <button class="btn btn-primary" onClick={getFidPhotograph}>
        Show Photograph
      </button>
      <button class="btn btn-primary" onClick={getFidDrawing}>
        Show Drawing
      </button>

      {fidList.map((val, key) =>{
        return(
          <div className="">
            <div className="card-body text-left">
              <table>
              <p className="card-text">&nbsp;&nbsp;credit: {val.name}</p>
              <p className="card-text" >&nbsp;&nbsp;Click on image to see original size </p>
              <a href = {val.url} download><img className="card-image" src={val.url} width="1000" height="1000"/></a>
              <p className="card-text">&nbsp;&nbsp;Type: {val.type}</p>
              <div className="d-flex">
                  <input
                    className=""
                    style={{ width: "300px" }}
                    type="text"
                    placeholder="Enter New credit"
                    onChange={(event) => {
                      setNewName(event.target.value)
                    }}
                  />
                  <button className="btn btn-warning" onClick={() => {updateFidname(val.id)}}>Update</button>
                  <button className="btn btn-danger" onClick={() => {deleteFID(val.id)}}>Delete</button>
                </div>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  </div>
);
}

export default App;