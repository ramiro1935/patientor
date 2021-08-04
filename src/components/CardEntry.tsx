import React from 'react'
import { Card, Icon, SemanticICONS, SemanticCOLORS } from 'semantic-ui-react'

export interface ICardEntryIcon {
  icon?: SemanticICONS
  text: string
  color?: SemanticCOLORS
}

interface ICardEntry {
  description: string
  header: ICardEntryIcon
  footer?: ICardIconProp
}

type ICardIconProp = ICardEntryIcon | null | undefined

const Header = ({ header }: { header: ICardIconProp }) => {
  if (!header) return null
  return (
    <Card.Header>
      {header.text}
      {<Icon name={header.icon} color={header.color} />}
    </Card.Header>
  )
}

const Content = ({ description }: { description: string }) => {
  return <Card.Description>{description}</Card.Description>
}

const Footer = ({ footer }: { footer: ICardIconProp }) => {
  if (!footer) return null
  return (
    <>
      {footer && (
        <Card.Description>
          {<Icon name={footer.icon} color={footer.color} />} {footer.text}
        </Card.Description>
      )}
    </>
  )
}

const CardEntry = ({ description, header, footer }: ICardEntry) => {
  return (
    <Card fluid>
      <Card.Content>
        <Header header={header} />
        <Content description={description} />
        <Footer footer={footer} />
      </Card.Content>
    </Card>
  )
}

export default CardEntry
