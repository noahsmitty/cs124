import React, {useState} from 'react';

// put this in App or List
function Button(props) {
    const [isHidden, setIsHidden] = useState(false);

    function handleHideShow() {
        props.handleHideShow();
        setIsHidden(!isHidden);
    }
    return (<div id="buttons">
        {isHidden === false ? <input type="submit" className="submit" id="hide" value="Hide Completed" onClick={handleHideShow}/> :
            <input type="submit" className="submit" id="hide" value="Show Completed" onClick={handleHideShow}/>}
        <input type="submit" className="submit" id="delete" value="Delete Completed" onClick={props.handleDelete}/>
    </div>);
}

export default Button;