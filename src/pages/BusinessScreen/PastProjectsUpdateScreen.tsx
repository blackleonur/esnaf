// PastProjectsUpdateScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';

const PastProjectsUpdateScreen: React.FC = () => {
  const [projects, setProjects] = useState([
    {id: '1', name: 'Proje 1', description: 'Modern ofis tasarımı'},
    {id: '2', name: 'Proje 2', description: 'Klasik ev dekorasyonu'},
  ]);

  const renderProject = ({item}: {item: any}) => (
    <View style={styles.projectItem}>
      <View style={styles.projectInfo}>
        <Text style={styles.projectName}>{item.name}</Text>
        <TextInput
          style={styles.input}
          placeholder="Proje Açıklaması"
          value={item.description}
          onChangeText={text => handleDescriptionChange(item.id, text)}
        />
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteProject(item.id)}>
        <Text style={styles.deleteButtonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  );

  const handleDescriptionChange = (id: string, newDescription: string) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === id ? {...project, description: newDescription} : project,
      ),
    );
  };

  const handleDeleteProject = (id: string) => {
    Alert.alert(
      'Silme Onayı',
      'Bu projeyi silmek istediğinizden emin misiniz?',
      [
        {text: 'İptal', style: 'cancel'},
        {
          text: 'Sil',
          onPress: () => {
            setProjects(prevProjects =>
              prevProjects.filter(project => project.id !== id),
            );
            Alert.alert('Başarılı', 'Proje silindi.');
          },
        },
      ],
    );
  };

  const handleSave = () => {
    Alert.alert('Başarılı', 'Geçmiş işler güncellendi.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geçmiş İşleri Güncelle</Text>

      <FlatList
        data={projects}
        keyExtractor={item => item.id}
        renderItem={renderProject}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  projectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  projectInfo: {
    flex: 1,
    marginRight: 8,
  },
  projectName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PastProjectsUpdateScreen;
