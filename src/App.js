import React, { useRef, useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch } from 'antd';
import { Button, Modal, icons } from 'antd';
import './App.css';
import Block from './Block';
function App() {
  const [blocks, setBlocks] = useState([]);
  const [currId, setcurrId] = useState(null);

  const addBlock = (blockType) => {
    setcurrId(Date.now());
    setBlocks((prevBlocks) => [...prevBlocks, { id: currId, type: blockType, content: null }]);
  };
  const removeBlock = (id) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  };
  const dragItem = useRef(null);
  const dragOverItem = useRef(null)
  const handleSort = (index) => {
    let _block = [...blocks];
    const draggedItemContent = _block.splice(dragItem.current, 1)[0];
    _block.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setBlocks(_block);
  }
  const handleDragStart = (e, index) => {
    dragItem.current = index;
  }
  const handleDragOver = (e, index) => {
    dragOverItem.current = index;
  }
  const handleBlock = (e, index) => {

    const _block = [...blocks];
    _block[index].content = e.target.value;
    setBlocks(_block);
  }
  const handleBlockImage = (index, url) => {
    const _block = [...blocks];
    _block[index].content = url;
    setBlocks(_block);

  }

  return (
    <>
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

        <div>
          {blocks.map((block, index) => (
            <div key={index} className="blocks-container">
              <Block
                key={block.id}
                id={block.id}
                index={index}
                type={block.type}
                data={block.content}
                onRemove={removeBlock}
                onDragEnd={handleSort}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onHandleBlock={handleBlock}
                onHandleBlockImage={handleBlockImage}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
