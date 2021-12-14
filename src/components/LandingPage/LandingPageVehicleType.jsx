import { Box, Stack, Card, Button } from '@mui/material'

function LandingPageVehicleType() {

    //local state for now but will have to pull from vehicle type in db
    const vehicleList = [
        { id: 1, name: 'Pontoon', image_url: '/images/pontoon.jpeg' },
        { id: 2, name: 'Runabout', image_url: '/images/runabout.png' },
        { id: 3, name: 'Fishing Boat', image_url: '/images/fishingboat.jpeg' },
        { id: 4, name: 'Jet Ski', image_url: '/images/jetski.png' },
        { id: 5, name: 'Canoe / Kayak', image_url: '/images/kayak.jpeg' },
    ];

    return (<>
        {/* page border */}
        <Box sx={{ height: '100vh', width: '100vw', border: 'solid black 1px' }}>
            <h1>SELECT VEHICLE TYPE</h1>

            {/* type selection */}
            <Box sx={{ margin: 'auto', border: 'solid black 1px', textAlign: 'center', width: '80%', padding: '1em' }}>
                <Stack
                    direction='row'
                    justifyContent='center'
                    alignItems='center'
                    sx={{ flexWrap: 'wrap' }}
                >
                    {vehicleList?.map(vehicle => (<>
                        <Card key={vehicle.name} sx={{ margin: '1em', height: '20vh', width: '20vw' }}>
                            <img src={vehicle.image_url} height='70%' />
                            <p>{vehicle.name}</p>
                        </Card>
                    </>))}
                </Stack>
                <Button variant='outlined'>Select Dates</Button>
            </Box>
        </Box>
    </>)
}
export default LandingPageVehicleType;