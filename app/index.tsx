import React, { useState } from 'react';
import { FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

const missaoPendente = {
  id: '0',
  titulo: 'Juntar 5 garrafas pet',
  pontos: 100,
  descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquam tristique tempor. Mauris sodales rhoncus tellus, iaculis ultrices quam mattis nec.'
};

const missoesDisponiveis = [
  { id: '1', titulo: 'Juntar 10 latinhas amassadas', pontos: 200, descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: '2', titulo: 'Juntar 10 latinhas amassadas', pontos: 200, descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: '3', titulo: 'Juntar 10 latinhas amassadas', pontos: 200, descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];

export default function Colaborador() {
  const [modalVisible, setModalVisible] = useState(false);
  const [codigoModalVisible, setCodigoModalVisible] = useState(false);
  interface Missao {
    id: string;
    titulo: string;
    pontos: number;
    descricao: string;
  }

  const [missaoSelecionada, setMissaoSelecionada] = useState<Missao | null>(null);

  const abrirModalResgatar = (missao: Missao) => {
    setMissaoSelecionada(missao);
    setModalVisible(true);
  };

  const abrirModalConcluir = (missao: Missao) => {
    setMissaoSelecionada(missao);
    setCodigoModalVisible(true);
  };

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container} >
      <ScrollView >
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Missões concluídas</Text>
        <Text style={styles.subLabel}>Desde 01/2024 até hoje</Text>

        <View style={styles.rowBetween}>
          <Text style={styles.valorGrande}>999.999.999</Text>
          <View style={styles.perfilCard}>
            <Text style={styles.label}>Pontos</Text>
            <Text style={styles.valorPequeno}>999.999.999</Text>
          </View>
        </View>

        <Text style={styles.label}>Missões de reconhecimento</Text>
        <View style={styles.reconhecimentoCard}>
          <Text style={styles.label}>Resgatar: <Text style={styles.pontuacao}>1000</Text> pontos</Text>
          <View style={styles.checkbox} />
        </View>

        <Text style={styles.label}>Missões Pendentes</Text>
        <TouchableOpacity style={styles.missaoCard} onPress={() => abrirModalConcluir(missaoPendente)}>
          <Text style={styles.tituloMissao}>{missaoPendente.titulo}</Text>
          <Text style={styles.pontuacao}>{missaoPendente.pontos}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Missões Disponíveis</Text>
        <FlatList
          data={missoesDisponiveis}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.missaoCard} onPress={() => abrirModalResgatar(item)}>
              <View>
                <Text style={styles.tituloMissao}>{item.titulo}</Text>
                <Text style={styles.subLabel}>{item.descricao}</Text>
              </View>
              <Text style={styles.pontuacao}>{item.pontos}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Modal Resgatar */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.tituloMissao}>{missaoSelecionada?.titulo}</Text>
            <Text style={styles.subLabel}>{missaoSelecionada?.descricao}</Text>
            <Text style={styles.label}>Você irá acumular: <Text style={styles.pontuacao}>{missaoSelecionada?.pontos}</Text></Text>
            <TouchableOpacity style={styles.botaoModal} onPress={() => setModalVisible(false)}>
              <Text style={styles.botaoTexto}>Resgatar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Código */}
      <Modal transparent={true} visible={codigoModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.tituloMissao}>Digite o código</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
              {[...Array(6)].map((_, i) => (
                <TextInput key={i} style={styles.codigoInput} maxLength={1} keyboardType="numeric" />
              ))}
            </View>
            <Text style={styles.label}>Você irá acumular: <Text style={styles.pontuacao}>{missaoSelecionada?.pontos}</Text></Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={styles.botaoModal} onPress={() => setCodigoModalVisible(false)}>
                <Text style={styles.botaoTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoModal}>
                <Text style={styles.botaoTexto}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
         </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#421b1b',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 15,
  },
  subLabel: {
    fontSize: 12,
    color: '#555',
  },
  valorGrande: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  valorPequeno: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  perfilCard: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  reconhecimentoCard: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: '#ddd',
    borderRadius: 4,
  },
  missaoCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tituloMissao: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  pontuacao: {
    fontWeight: 'bold',
    color: '#421b1b',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  botaoModal: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  botaoTexto: {
    fontWeight: 'bold',
  },
  codigoInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: 40,
    height: 40,
    textAlign: 'center',
  },
});