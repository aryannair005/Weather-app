import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";
import SunnyIcon from '@mui/icons-material/Sunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';


export default function InfoBox({info}){
    let initUrl="https://images.unsplash.com/photo-1668531387310-9c3c2f272d52?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    let HotUrl="https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618_1280.jpg";
    let ColdUrl="https://cdn.pixabay.com/photo/2014/12/02/22/05/snowflakes-554635_1280.jpg";
    let RainUrl="https://cdn.pixabay.com/photo/2014/12/02/22/05/snowflakes-554635_1280.jpg";
    return (
        <div className="InfoBox">
            <br />
            <div className="cardContainer">
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={info.humidity>80?RainUrl:info.temp>15?HotUrl:ColdUrl}
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                        {info.city} {info.humidity><ThunderstormIcon/>?RainUrl:info.temp>15?<SunnyIcon/>:<AcUnitIcon/>}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
                            <p>Temperature ={info.temp}&deg;C</p>
                            <p>Humidity = {info.humidity}</p>
                            <p>Min Temp = {info.tempMin}&deg;C</p>
                            <p>Max Temp = {info.tempMax}&deg;C</p>
                            <p>The weather can be described as <i>{info.weather}</i> and feels like {info.feelsLike}&deg;C</p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}