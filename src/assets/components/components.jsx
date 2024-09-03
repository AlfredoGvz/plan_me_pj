export const Button = (props) => {
  return <button className={props.className}>{props.innerText}</button>;
};

export const EventTile = (props) => {
  return (
    <div className={props.generals}>
      <div className={props.dateInfo}>
        <p>{props.date}</p>
        <p>{props.start_time}</p>
      </div>
      <div className={props.generalDetails}>
        <h1>{props.title}</h1>
        <p>{props.city}</p>
      </div>
      <div className={props.buttonArea}>
        <Button innerText={props.action} />
      </div>
    </div>
  );
};
