import React from 'react'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';


const  Autocomplete = () => {

    const [ address, setAddress] = React.useState('');
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
    })

    const [schools, setSchools] = React.useState([]);



    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value)
        setCoordinates(latLng);
        
        fetch(`http://localhost:5000/closeschools?lng=${latLng.lng}&lat=${latLng.lat}`).then(res=>res.json()).then(data=> setSchools(data))
    }

    const handleChange = async value =>{
        if(value === ''){
            await setSchools([])
        }
        await setAddress(value)
    }

    console.log(schools);
    return (
        <div>
            <PlacesAutocomplete  value={address} onChange={handleChange} onSelect={handleSelect}>{({getInputProps, suggestions, getSuggestionItemProps, loading})=>(
            <div>
                <p>Latitude: {coordinates.lat}</p>
                <p>Longitude: {coordinates.lng}</p>
                <input {...getInputProps({ placeholder: "Type address"})} style={{width: '600px', height: '30px' }}/>
            <div>
                {loading ? <div>...loading</div> : null}
                {suggestions.map(suggestion =>{
                    const style = {
                        backgroundColor: suggestion.active ? "#ffff" : "#d6d8e1"
                    };
                    return (<div key={suggestion.placeId}{...getSuggestionItemProps(suggestion, {style})}>{suggestion.description}</div>);
                })}
            </div>
            </div>)}</PlacesAutocomplete>
            <ul style={{listStyle:"none"}}>
            {schools.map(school=> <li style={{}}key={school._id}><div style={{margin: '5px', padding: "20px",border: "1px grey solid"}}>
                <span>{school.name}</span>
                <div>{school.email}</div>
                <div>{school.languages}</div>
                <div>{school.network}</div>
                <div>{school.phone}</div>
                <div>{school.type}</div>
                <div>{school.rating}</div>
                </div></li>)}
            </ul>
        </div>
    )
}

export default Autocomplete ;
