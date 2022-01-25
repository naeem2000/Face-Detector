import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import NewPost from './components/NewPost'

function App() {
  const [file,setFile] = useState();
  const [image, setImage] = useState()

  useEffect(() => {
  const getImage = () => {
    const img = new Image()
    img.src = URL.createObjectURL(file);
    img.onload = () => {
    setImage({
      url: img.src,
      width: img.width,
      height: img.height,
    });
    }
  };

    file && getImage()
  }, [file]);

  return (
    <div>
      <Navbar />
      {image ? (
        <NewPost image={image} />
      ) : (
      <div className='newPostCard'>
        <div className="addpost">
          <div className="postForm">
            <label htmlFor="file">
              <img
              className='addImg'
              src="images/Add_Image_icon-icons.com_54218.png" 
              alt=""
              />
            </label>
            <input
            onChange={(e) => setFile(e.target.files[0])} 
            id='file'
            style={{display:"none"}}
            type="file" />
          </div>
        </div>
      </div>
      )}
      <footer>M.N Carr</footer>
    </div>
  );
}

export default App;