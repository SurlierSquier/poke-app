import { Box, Card, CardContent, CardHeader, Skeleton } from "@mui/material"

export const SkeletonCard = () => {
    return (
        <Card sx={{ 
          height: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          borderRadius: '16px',
          backgroundColor: '#f5f5f5',
          position: 'relative',
          minWidth: 200,
          margin: '10px'
        }}>
          <CardHeader
            title={<Skeleton variant="text" width="80%" height={24} sx={{ mx: 'auto' }} />}
            subheader={<Skeleton variant="text" width="40%" height={16} sx={{ mx: 'auto' }} />}
            sx={{ textAlign: 'center', pb: 0 }}
          />

          <Skeleton 
            variant="circular" 
            width={32} 
            height={32} 
            sx={{ position: 'absolute', top: 100, left: 8 }}
            animation="wave"
          />
          
          <Skeleton
            variant="rectangular"
            width={120}
            height={120}
            sx={{ 
              mx: 'auto',
              borderRadius: '8px'
            }}
            animation="wave"
          />
          
          <Skeleton 
            variant="circular" 
            width={32} 
            height={32} 
            sx={{ position: 'absolute', top: 100, right: 8 }}
            animation="wave"
          />

          <CardContent sx={{ textAlign: 'center', pt: 1, flex: 1}}>
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1 }}>
                <Skeleton variant="rounded" width={60} height={20} />
                <Skeleton variant="rounded" width={60} height={20} />
              </Box>
              
              <Box sx={{ mt: 1}}>
                <Skeleton variant="text" width="70%" height={16} sx={{ mx: 'auto', mb: 0.5 }} animation="wave" />
                <Skeleton variant="text" width="70%" height={16} sx={{ mx: 'auto' }} animation="wave" />
              </Box>
            </Box>
          </CardContent>
          
          <Skeleton 
            variant="circular" 
            width={24} 
            height={24} 
            sx={{
              position: 'absolute',
              top: 12,
              right: 16,
              zIndex: 1,
            }}
            animation="wave"
          />
        </Card>
    )
}
