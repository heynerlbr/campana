import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { urlRest, CLIENT_ID, CLIENT_SECRET } from "../api/api";

export default class Lugares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      municipios: [],
      departamentos: [],
      selectedMunicipio: null,
      selectedDepartamento: null,
    };
  }

  componentDidMount() {
    this.fetchDepartamentos();
  }

  fetchDepartamentos = () => {
    const urlCompleta = urlRest + "api/getDepartamentos";
    axios
      .get(urlCompleta)
      .then((response) => {
        const departamentosData = response.data.departamentos;
        if (departamentosData) {
          const departamentos = departamentosData.map((departamento) => ({
            value: departamento.id_departamento,
            label: departamento.departamento,
          }));
          this.setState({ departamentos });
        } else {
          console.log(
            "No se encontraron datos de departamentos en la respuesta."
          );
        }
      })
      .catch((error) => {
        console.log("Error al conectar con la API De:", error);
      });
  };

  fetchMunicipiosByDepartamento = (selectedDepartamento) => {
    const urlCompleta = urlRest + "api/getMunicipios";
    axios
      .get(urlCompleta, {
        params: { departamento_id: selectedDepartamento },
      })
      .then((response) => {
        const municipiosData = response.data.municipios;
        if (municipiosData) {
          const municipios = municipiosData.map((municipio) => ({
            value: municipio.id_municipio,
            label: municipio.municipio,
          }));
          this.setState({ municipios });
        } else {
          console.log("No se encontraron datos de municipios en la respuesta.");
        }
      })
      .catch((error) => {
        console.log("Error al conectar con la API:", error);
      });
  };

  handleDepartamentoChange = (selectedDepartamento) => {
    this.setState({ selectedDepartamento }, () => {
      console.log("id--", selectedDepartamento);
      this.fetchMunicipiosByDepartamento(selectedDepartamento);
    });
  };

  handleMunicipioChange = (selectedMunicipio) => {
    this.setState({ selectedMunicipio });
  };

  handleSubmit = () => {
    // Realizar alguna acción al presionar el botón de filtro, si es necesario
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Selecciona un departamento</Text>
          <SelectDropdown
            style={styles.dropdown}
            data={this.state.departamentos}
            onSelect={(selectedItem, index) =>
              this.handleDepartamentoChange(selectedItem.value)
            }
            defaultButtonText={"Selecciona un departamento"}
            buttonTextAfterSelection={(selectedItem, index) =>
              selectedItem.label
            }
            rowTextForSelection={(selectedItem, index) => {
              return selectedItem.label;
            }}
          />
        </View>
        <View style={styles.form}>
          <Text style={styles.title}>Selecciona un municipio</Text>
          <SelectDropdown
            style={styles.dropdown}
            data={this.state.municipios}
            onSelect={(selectedItem, index) =>
              this.handleMunicipioChange(selectedItem.value)
            }
            defaultButtonText={"Selecciona un municipio"}
            buttonTextAfterSelection={(selectedItem, index) =>
              selectedItem.label
            }
            rowTextForSelection={(selectedItem, index) => {
              return selectedItem.label;
            }}
          />
        </View>
        <Button title="Filtrar" onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  form: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
  },
  dropdown: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
