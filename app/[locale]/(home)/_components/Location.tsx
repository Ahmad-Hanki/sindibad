const Location = () => {
  return (
    <div className="w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3183.747593553684!2d37.392220375657956!3d37.063497672173185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1531e6a538a1763b%3A0xa4457583b592d2d7!2sAltin%20Sindibau%20Lokantasi!5e0!3m2!1sen!2str!4v1729363699347!5m2!1sen!2str"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-[50vh] md:h-[70vh]"
      ></iframe>
    </div>
  );
};

export default Location;
