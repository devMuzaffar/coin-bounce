const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <div className="mx-auto">&copy; CoinBounce {year}</div>
  )
}

export default Footer