function Header({ headers }: { headers: string[] }) {
  return (
    <thead>
      <tr>
        <th></th>
        {headers.map((title, index) => (
          <th key={title + index}>{title}</th>
        ))}
        <th></th>
      </tr>
    </thead>
  );
}

export default Header;
