import React, {useState } from 'react';
import { Button, Modal} from 'antd';
import './App.css';
import Block from './Block';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
function App() {
  const [blocks, setBlocks] = useState([]);
  const [currId, setcurrId] = useState(null);

  const addBlock = (blockType) => {
    setBlocks((prevBlocks) => [...prevBlocks, { id: `block-${blocks.length + 1}`, type: blockType, content: null }]);
  };
  const removeBlock = (id) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };

  const handleSort = (result) => {
    let _block = [...blocks];
    const draggedItemContent = _block.splice(result.source.index, 1)[0];
    if(!result.destination)_block.splice(blocks.length-1,0,draggedItemContent);
    else  _block.splice(result.destination.index, 0, draggedItemContent);
    setBlocks(_block);
  }
  const handleBlock = (e, index) => {
    e.preventDefault();
    const _block = [...blocks];
    _block[index].content = e.target.value;
    setBlocks(_block);
  }
  const handleBlockImage = (index, url) => {

    const _block = [...blocks];
    _block[index].content = url;
    setBlocks(_block);
  }

  // } <DragDropContext
  //       onDragEnd={() => {
  //         console.log("hello");
  //       }}
  //     >
  //       <Droppable droppableId="droppable">
  //         {(provided) => (
  //           <div {...provided.droppableProps} ref={provided.innerRef}>
  //             {this.state.items.map((item, index) => (
  //               <Draggable key={item.id} draggableId={item.id} index={index}>
  //                 {(provided) => (
  //                   <div
  //                     ref={provided.innerRef}
  //                     {...provided.draggableProps}
  //                     {...provided.dragHandleProps}
  //                   >
  //                     {item.content}
  //                   </div>
  //                 )}
  //               </Draggable>
  //             ))}
  //             {provided.placeholder}
  //           </div>
  //         )}
  //       </Droppable>
  //     </DragDropContext>
  const DragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    handleSort(
      result.source.index,
      result.destination.index
    );
  }
  return (


    <div className="App">
      <Button
        type="primary"
        onClick={() => {
          Modal.confirm({
            title: 'Add Block',
            content: (
              <div>
                <Button onClick={() => addBlock('text')}>Text Block</Button>
                <Button onClick={() => addBlock('image')}>Image Block</Button>
              </div>
            ),
            onCancel: () => removeBlock(currId),
          });
        }}
      >
        Add Block
      </Button>
      <DragDropContext onDragEnd={handleSort}>
        <Droppable droppableId="droppable" key="droppable" type='group'>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {blocks.map((block, index) => (
                <Draggable
                  key={block.id}
                  draggableId={block.id}
                  index={index}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Block
                        key={block.id}
                        id={block.id}
                        index={index}
                        type={block.type}
                        data={block.content}
                        onRemove={removeBlock}
                        onHandleBlock={handleBlock}
                        onHandleBlockImage={handleBlockImage}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div >

  );
}

export default App;
