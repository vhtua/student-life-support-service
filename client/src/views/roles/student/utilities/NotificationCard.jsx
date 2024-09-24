import React, { useEffect } from 'react';
import { Card, CardContent, Typography, CardHeader, Avatar } from '@mui/material';


const NotificationCard = ({ notification, handleNotificationCardUpdate }) => {

    useEffect(() => {}, [handleNotificationCardUpdate]);

    const { title, fullname, created_date, content } = notification;

    const formattedDate = new Date(created_date).toLocaleString();

    return (
        <Card sx={{ maxWidth: 800, margin: '10px auto', boxShadow: 3, borderRadius: 2 }} >
            <CardHeader
                avatar={<Avatar>{fullname.charAt(0)}</Avatar>}
                title={title}
                // subheader={formattedDate}
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

export default NotificationCard;

// Usage example
// const notification = {
//   title: "New Campus Cafeteria Opening on October 1st",
//   fullname: "Trần Văn Sinh",
//   created_date: "2024-09-21T07:15:13.000Z",
//   content: "Dear Resident,\r\nPlease be advised that maintenance work is scheduled in Dormitory Block A on September 25th, 2024, from 10:00 AM to 2:00 PM. Water and electricity will be temporarily unavailable during this time. We apologize for any inconvenience caused.\r\n\r\nBest regards,\r\nStudent Affairs Office"
// };

// <NotificationCard notification={notification} />