<h2>Customer Details: {customer.fullname}</h2>
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone}</p>
        <p>Mobile: {customer.mobile}</p>
        <p>Address: {customer.address}</p>
        <p>City: {customer.city}</p>
        <p>State: {customer.state}</p>
        <p>Zip Code: {customer.zip}</p>
        <p>Latitude: {customer.latitude}</p>
        <p>Longitude: {customer.longitude}</p>
        <p>Created At: {new Date(customer.created_at).toLocaleString()}</p>
        <p>Updated At: {new Date(customer.updated_at).toLocaleString()}</p>
        <p>
          Online Profile URL:{" "}
          <a
            href={customer.online_profile_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Profile
          </a>
        </p>
        {/* Additional fields as needed */}
        {/* Example: Loop through properties if they exist */}
        {customer.properties && (
          <div>
            <h3>Properties:</h3>
            {Object.entries(customer.properties).map(([key, value]) => (
              <p key={key}>
                {key}: {value}
              </p>
            ))}
          </div>
        )}
        {/* Contacts - Assuming it's an array of contact objects */}
        {customer.contacts && customer.contacts.length > 0 && (
          <div>
            <h3>Contacts:</h3>
            {customer.contacts.map((contact, index) => (
              <p key={index}>
                Contact {index + 1}: {JSON.stringify(contact)}
              </p>
            ))}
          </div>
        )}{" "}
        {/* Add more fields as per your data structure */}