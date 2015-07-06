 Date Format Specification
==============

While specifying the format for dates you can use any character from the following list:

- **%y** - the year as a two-digit number ( _00 to 99_ );
- **%Y** - the year as a four-digit number ( _1900-9999_ );
<br>
<br>
- **%m** - the month as a number with a leading zero ( _01 to 12_ );
- **%n** - the month as a number without a leading zero ( _1 to 12_ ); 
- **%M** - the month as an abbreviation ( _Jan to Dec_ );
- **%F** - the month as a full name ( _January to December_ );
<br>
<br>
- **%W** - the ISO-8601 week number of the year. Weeks start on Monday; 
<br>
<br>
- **%d** - the day as a number with a leading zero ( _01 to 31_ );
- **%j** - the day as a number without a leading zero ( _1 to 31_ );
- **%D** - the day as an abbreviation ( _Sun to Sat_ );
- **%l** - the day as a full name ( _Sunday to Saturday_ );
<br>
<br>
- **%h** - the hour based on the 12-hour clock ( _00 to 11_ );
- **%H** - the hour based on the 24-hour clock ( _00 to 23_ );
- **%g** - the hour based on the 12-hour clock without a leading zero ( _1 to 12_ );
- **%G** - the hour based on the 24-hour clock without a leading zero ( _0 to 23_ );
<br>
<br>
- **%i** - the minute as a number with a leading zero ( _00 to 59_ );
- **%s** - the second as a number with a leading zero ( _00 to 59_ );
- **%a** - displays **am** (for times from midnight until noon) and **pm** (for times from noon until midnight);
- **%A** - displays **AM** (for times from midnight until noon) and **PM** (for times from noon until midnight).

For example, if you want to present 1st June 2013 as 01/06/2013, you should specify "%d/%m/%Y".