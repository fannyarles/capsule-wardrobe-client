import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dressingApi from "../../services/DressingApi.service";

function AddItem() {
    
    const navigate = useNavigate();

    const [ itemInfos, setItemInfos ] = useState({ type: '', brand: '', imageUrl: '' })
    const [ occasions, setOccasions ] = useState([])
    const [ errorMessage, setErrorMessage ] = useState('');

    const handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        setItemInfos({ ...itemInfos, [name]: value });
    }

    const handleCheckboxChange = e => {
        const name = e.target.name;
        const checked = e.target.checked;

        if ( checked ) { setOccasions( [...occasions, name ] )
        } else { setOccasions( [...occasions].filter(el => el === name) )}
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ( itemInfos.type === '' || itemInfos.imageUrl === '' || !occasions.length ) { setErrorMessage(`Please, fill all required fields.`); return; }

        dressingApi.addItem({ ...itemInfos, occasions: occasions})
        .then(response => navigate('/dressing'))
        .catch(err => setErrorMessage(err.response.data.message))
    }

    const handleUpload = async (e) => {
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
     
        const response = await dressingApi.uploadPhoto( uploadData )
                        .catch(err => setErrorMessage("Error while uploading the file: ", err));
        
        const fileUrl = response.fileUrl;
        setItemInfos({ ...itemInfos, imageUrl: fileUrl });


    }

    return <div id="add-item form-page">
        <h1>Add new clothing item</h1>

        { errorMessage && <p>{ errorMessage }</p> }

        <form onSubmit={ handleSubmit }>
            <label htmlFor="type">Type of clothing <span className="required">(Required)</span></label><br/>
            <select name="type" value={ itemInfos.type } onChange={ handleInputChange }>
                <optgroup label="Tops">
                    <option>T-shirt</option>
                    <option>Tank top</option>
                    <option>Shirt</option>
                    <option>Blouse</option>
                    <option>Sweater</option>
                    <option>Jacket | Vest</option>
                    <option>Coat</option>
                    <option>Sweater</option>
                </optgroup>
                <optgroup label="Bottoms">
                    <option>Jeans</option>
                    <option>Pants</option>
                    <option>Skirt</option>
                    <option>Shorts</option>
                    <option>Tracksuit</option>
                </optgroup>
                <optgroup label="Other">
                    <option>Pantsuit</option>
                    <option>Dress</option>
                </optgroup>
                <optgroup label="Footwear">
                    <option>Sandals</option>
                    <option>Heels</option>
                    <option>Sneakers</option>
                    <option>Boots</option>
                </optgroup>
                <optgroup label="Accessories">
                    <option>Scarf</option>
                    <option>Glasses | Sunglasses</option>
                    <option>Bag | Purse</option>
                    <option>Earrings</option>
                    <option>Bracelet</option>
                    <option>Necklace</option>
                    <option>Ring</option>
                    <option>Watch</option>
                    <option>Belt</option>
                    <option>Hat</option>
                </optgroup>
            </select><br/><br/>
            
            <label htmlFor="brand">Brand</label><br/>
            <input list="brands" id="brand" name="brand" value={ itemInfos.brand } onChange={ handleInputChange } />

            <datalist id="brands">
                <option value="A.P.C." />
                <option value="A|X Armani Exchange" />
                <option value="ACME" />
                <option value="Acne Studio" />
                <option value="adidas" />
            </datalist><br/><br/>
            
            <label htmlFor="occasion">Occasions <span className="required">(Required)</span></label><br/>
            <input type="checkbox" id="casual" name="casual" value={ itemInfos.casual } onChange={ handleCheckboxChange } />
            <label htmlFor="casual">Casual</label><br/>
            <input type="checkbox" id="formal" name="formal" value={ itemInfos.formal } onChange={ handleCheckboxChange } />
            <label htmlFor="formal">Formal</label><br/>
            <input type="checkbox" id="business" name="business" value={ itemInfos.business } onChange={ handleCheckboxChange } />
            <label htmlFor="business">Business</label><br/>
            <input type="checkbox" id="sportswear" name="sportswear" value={ itemInfos.sportswear } onChange={ handleCheckboxChange } />
            <label htmlFor="sportswear">Sportswear</label><br/><br/>
            
            <label htmlFor="picture">Picture <span className="required">(Required)</span></label><br/>
            <input name="picture" type="file" onChange={ handleUpload } />
            <br/><br/>

            <input type="submit" value="Add item" className='btn btn-primary' />
        </form>

    </div>
}

export default AddItem;