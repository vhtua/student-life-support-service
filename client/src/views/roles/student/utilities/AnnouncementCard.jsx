import React, { useEffect } from 'react';
import { Card, CardContent, Typography, CardHeader, Avatar } from '@mui/material';


const AnnouncementCard = ({ announcement, handleAnnouncementCardUpdate }) => {

    useEffect(() => {}, [handleAnnouncementCardUpdate]);

    const { title, fullname, created_date, content } = announcement;
    const formattedDate = new Date(created_date).toLocaleString();

    const cardSX = {
        content: '""',
        position: 'absolute',
        width: 200,
        height: 200,
        borderColor: 'warning.main'
    };

    return (
        <Card sx={{
            bgcolor: 'warning.light',
            my: 2,
            overflow: 'hidden',
            position: 'relative',
            '&:after': {
              border: '19px solid ',
              borderRadius: '50%',
              top: '65px',
              right: '-150px',
              ...cardSX
            },
            '&:before': {
              border: '3px solid ',
              borderRadius: '50%',
              top: '145px',
              right: '-70px',
              ...cardSX
            }
          }}>
            <CardHeader
                avatar={<Avatar >{fullname.charAt(0)}</Avatar>}
                title={title}
                subheader={
                    <>
                        {formattedDate}
                        <Typography variant="body2" color="textSecondary">
                            {fullname}
                        </Typography>
                    </>
                }
            />
            <CardContent>
                {content.split('\n').map((line, index) => (
                    <Typography key={index} variant="body2" color="textSecondary" component="p">
                        {line}
                    </Typography>
                ))}
            </CardContent>
        </Card>
    );
};

export default AnnouncementCard;
