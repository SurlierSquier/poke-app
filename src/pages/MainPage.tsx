
import { TypeFilter, AllButton, FavButton } from '../components';

import { Grid,  Box } from "@mui/material";

import { PokeGrid } from "../components/"

export const MainPage = () => {
    return (
       
        <Box 
            component="section" 
            sx={{ 
                justifyContent: 'center', 
                paddingY: 4, 
                marginY: '40px',
                width: { xs:'90%', sm: '90%', md: '90%' },
                minHeight: 'calc(100vh - 80px)',
                overflow: 'hidden',
            }} 
            bgcolor="#f5f5f5" 
            margin="auto" 
            borderRadius="32px"
        >
            <h1 style={{
                textAlign: 'center',
                marginBottom: '20px',
                color: '#FFCB05',
            }}>
                Pokédex
            </h1>


            <Grid container 
                spacing={2} 
                sx={{ 
                    display: { xs: 'flex-column', sm: 'flex-row' },
                    marginInline: { xs: '20px', sm: '40px', md: '80px' },
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'}} 
                width="auto"> 
                <Box 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                    width="100%"
                    gap="16px"
                >
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            order: { xs: 2, md: 1 }, 
                            gap: '16px',
                            
                        }}
                        width="100%"
                        >
                        <TypeFilter />
                    </Box>
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            order: { xs: 1, md: 2 },
                            gap: '16px',
                            justifyContent: { xs: 'space-between', md: 'flex-end'},
                            marginY: { xs: '16px', md: '8px' }
                        }}
                        width="100%"
                    >
                        <AllButton />
                        <FavButton />
                    </Box>
                </Box>
            </Grid>
                <PokeGrid />
        </Box>
    )
}
