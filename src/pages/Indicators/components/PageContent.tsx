import React from "react";

interface columnProps{
  date:Date
}

const PageContent: React.FC<columnProps> = ({date}) => { 
  let formattedDate=`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

  return (
    <>{formattedDate}</>
  );
};

export default PageContent;
