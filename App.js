import React, { useState } from "react"
import { StyleSheet, Text, View, FlatList, Image } from "react-native"
import Modal from "./src/components/Modal"
import AddItem from "./src/components/AddItem"
import Button from "./src/components/Button"

export default function App() {
  const [textItem, setTextItem] = useState("")
  const [list, setList] = useState([])
  const [itemSelected, setItemSelected] = useState("")
  const [modalVisble, setModalVisible] = useState(false)

  const onHandleChangeItem = text => {
    setTextItem(text)
  }

  const addItem = () => {
    setList(prevState => [...prevState, textItem])
    setTextItem("")
  }

  const handleModal = item => {
    setItemSelected(item)
    setModalVisible(true)
  }

  const onHandleDelete = item => {
    console.log(item)
    setList(prevState => prevState.filter(element => element !== item))
    setModalVisible(!modalVisble)
  }

  const renderItem = ({ item }) => (
    <View style={styles.renderItemStyle}>
      <Text style={styles.itemStyle}>{item}</Text>
      <Button title="Editar" onPress={() => handleModal(item)} />
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Agregá a tu carrito un curso para padres actualizados: </Text>
       
        <AddItem
          onChange={onHandleChangeItem}
          textValue={textItem}
          onAddItem={addItem}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item}
        />
      </View>
      <Modal
        isVisible={modalVisble}
        itemSelected={itemSelected}
        actionDeleteItem={() => onHandleDelete(itemSelected)}
        onDismissModal={setModalVisible}
      />
    
      <Image
         style= {styles.logo}
         source={ require ('./src/elements/LogoMaternidad.jpg')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: "#FFF3C0",
  },
  titleContainer: {
    height: 230,
    paddingHorizontal: 30,
    paddingTop: 80,
  },
  title: {
    marginBottom: 26,
    fontSize: 26,
    fontWeight: "500",
    color: "#FF914D",
  },
  listContainer: {
    flex: 2,
    marginHorizontal: 30,
    marginTop: 40,
    padding: 3,
  },
  renderItemStyle: {
    height: 60,
    flexDirection: "row",
    marginBottom: 25,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
  itemStyle: {
    color: "#FFBD59",
  },
  logo: {
    
  }
})