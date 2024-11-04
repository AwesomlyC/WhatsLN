import React, { useState } from 'react'
import Modal from 'react-modal';
import axios from 'axios';
import './../styles/UpdateModal.css'

Modal.setAppElement("#root");
function UpdateModal({ currentTitle, nodeID, type, mangaChange, animeChange, retrieveManga, retrieveAnime, refreshPage}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    // const [currentTitle, setCurrentTitle] = useState('');
    const [status, setStatus] = useState('1');
    const [score, setScore] = useState('');

    const animeStatus = ['watching', 'completed', 'on_hold', 'dropped', 'plan_to_watch']
    const mangaStatus = ['reading', 'completed','on_hold','dropped','plan_to_read']
    
    const openModal = (title) => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }
    const updateItem = (type) => {
        const updatedStatus = (type === 'Anime' ? animeStatus[status - 1] : mangaStatus[status - 1]);
        console.log(`Updating ${type} ${currentTitle} ${nodeID} with status: ${updatedStatus} and  score: ${score}`)
        
        axios.get(`${process.env.REACT_APP_BACKEND_API}/account/update/${type}/${nodeID}?status=${updatedStatus}&score=${score}`, { withCredentials: true })
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log("ERROR: " + error);
        })
        reset();
    }

    const deleteItem = () => {
        console.log("Deleting: " + nodeID + " " + currentTitle);
        axios.get(`${process.env.REACT_APP_BACKEND_API}/account/delete/${type}/${nodeID}`, { withCredentials: true })
            .then(response => {
                console.log(response.data);
                if (type === 'anime') {
                    animeChange(false);
                    refreshPage("anime");
                }
                else {
                    mangaChange(false);
                    refreshPage("manga");
                }
            }).catch(error => {
                console.log("Error: " + error);
            });
        refreshPage(type);
        reset();
    }

    const reset = () => {
        setStatus('1');
        setScore('');
        setModalIsOpen(false);
    }
  return (
      <div>
          <div>
              <button onClick={() => openModal(currentTitle)}>Update {nodeID}</button>
              <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  className="modal"
                  overlayClassName='overlay'
                  contentLabel="Modal"
              >
                  <h3>Edit {type}</h3>
                  <hr />        
                  <form>
                      <table border="0" cellPadding="5" cellSpacing="0" width="100%">
                          <tbody>
                              <tr>
                                  <td width="130" className="borderClass" valign='top'>Title</td>
                                  <td class="borderClass"><b>{currentTitle}</b></td>
                              </tr>
                              <tr>
                                  <td class="borderClass">Status</td>
                                  <select id="status" onChange={(e) => setStatus(e.target.value)}>
                                      <option value="1" selected>{type === "anime" ? "Watching" : "Reading"}</option>
                                      <option value="2">Completed</option>
                                      <option value="3">On-Hold</option>
                                      <option value="4">Dropped</option>
                                      <option value="5">{type === "anime" ? "Plan to Watch" : "Plan to Read"}</option>
                                  </select>
                              </tr>
                              <tr>
                                  <td class="borderClass">Score</td>
                                  <select id="score" onChange={(e) => setScore(e.target.value)}>
                                      <option value="" selected>Select score</option>
                                      <option value="10">(10) Masterpiece</option>
                                      <option value="9">(9) Great</option>
                                      <option value="8">(8) Very Good</option>
                                      <option value="7">(7) Good</option>
                                      <option value="6">(6) Fine</option>
                                      <option value="5">(5) Average</option>
                                      <option value="4">(4) Bad</option>
                                      <option value="3">(3) Very Bad</option>
                                      <option value="2">(2) Horrible</option>
                                      <option value="1">(1) Appalling</option>
                                  </select>
                            </tr>
                          </tbody>
                      </table>
                      <hr />
                          <div className='form-submit'>
                              <input type="button" value="Submit" onClick={(e) => updateItem(type)}></input>
                              <input type="button" value="Delete" onClick={deleteItem}></input>
                              
                          </div>
                  </form>
              </Modal>
          </div>
      </div>
  )
}

export default UpdateModal