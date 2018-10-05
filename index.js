const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const port = 8894;
const actionDb = require('./data/helpers/actionModel');
const projectDb = require('./data/helpers/projectModel');
const errHelper = (status, message, res) => {
  res.status(status).json({ Error: message });
}

//service code
const server = express();
server.use(express.json());
server.use(logger('combined'), cors(), helmet());


//custom middleware---------------------------------------
const proCheck = (req, res, next) => {
  const name  = req.body.name;
  const description = req.body.description
  if(!name || !description) {
    return errHelper(404, 'Name and description are required.', res);
    next();
  } else if(name.length > 128) {
    return errHelper(404, 'Name can not be more than 128 characters.', res);
    next();
  } else {
    next();
  }
}

const actCheck = (req, res, next) => {
  const project_id = req.body.project_id;
  const description = req.body.description;
  const notes = req.body.notes;
  if(!project_id || !description || !notes) {
    return errHelper(404, 'Project ID, description, and notes are required.', res);
    next();
  } else if (description.length > 128) {
    return errHelper(404, 'Description can not exceed 128 characters.', res);
    next();
  }
  next();
}

//routes tester-------------------------------------------
server.get('/', (req, res) => {
  res.json('！*★,°*:.☆(￣▽￣)/$:*.°★* 。');
});

//projects------------------------------------------------
server.get('/api/projects', (req, res) => {
  projectDb
    .get()
    .then(projects => {
      console.log('\n--- Success ---', projects);
      res.status(200).json(projects);
    })
    .catch(err => {
      return errHelper(500, 'Error getting projects.', res);
    });
});

server.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projectDb
    .get(id)
    .then(project => {
      console.log('\n--- Success ---', project);
      res.status(200).json(project);
    })
    .catch(err => {
      return errHelper(500, 'Error getting project by ID.', res);
    });
});

server.get('/api/projects/actions/:projectId', (req, res) => {
  const { projectId } = req.params;
  projectDb
    .getProjectActions(projectId)
    .then(actions => {
      console.log('\n--- Success ---', actions);
      res.status(200).json(actions);
    })
    .catch(err => {
      return errHelper(500, 'Error getting project actions.', res);
    });
});

server.post('/api/projects', proCheck, (req, res) => {
  const { name, description } = req.body;
  const newAction = { name, description };
  projectDb
    .insert(newAction)
    .then( newPro => {
      console.log('\n--- Success ---', newPro);
      res.json(newPro);
    })
    .catch(err => {
      return errHelper(500, 'Error adding new project.', res);
    });
});

server.put('/api/projects/:id', proCheck, (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const editProject = { name, description }
  projectDb
    .update(id, editProject)
    .then(projectDb => {
      console.log('\n--- Success ---', editProject);
      projectDb
        .get(id)
        .then(project => {
          res.json(project)
        });
    })
    .catch(err => {
      return errHelper(500, 'Error editing project.', res);
    });
});

server.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projectDb
    .remove(id)
    .then(proRemoved => {
      res.json({ Success: 'Project removed.'});
    })
    .catch(err => {
      return errHelper(500, 'Error removing project.', res);
    });
})

//action--------------------------------------------------
server.get('/api/actions', (req, res) => {
  actionDb
    .get()
    .then(actions => {
      console.log('\n--- Success ---', actions);
      res.status(200).json(actions);
    })
    .catch(err => {
      return errHelper(500, 'Error getting actions.', res);
    });
});

server.get('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  actionDb
    .get(id)
    .then(action => {
      console.log('\n--- Success ---', action);
      res.status(200).json(action);
    })
    .catch(err => {
      return errHelper(500, 'Error getting action by ID.', res);
    });
});

server.post('/api/actions', actCheck, (req, res) => {
  const { project_id, description, notes } = req.body;
  const newAction = { project_id, description, notes };
  actionDb
    .insert(newAction)
    .then( newAct => {
      console.log('\n--- Success ---', newAct);
      res.json(newAct);
    })
    .catch(err => {
      return errHelper(500, 'Error adding new action.', res);
    });
});

server.put('/api/actions/:id', actCheck, (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes } = req.body;
  const editAction = { project_id, description, notes }
  actionDb
    .update(id, editAction)
    .then(action => {
      console.log('\n--- Success ---', action);
      actionDb
        .get(id)
        .then(action => {
          res.json(action)
        });
    })
    .catch(err => {
      return errHelper(500, 'Error editing action.', res);
    });
});

server.delete('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  actionDb
    .remove(id)
    .then(actRemoved => {
      console.log('\n--- Success ---', actRemoved);
      res.json({ Success: 'Action removed.'});
    })
    .catch(err => {
      return errHelper(500, 'Error removing action.', res);
    });
})


//port
server.listen(port, () => {
  console.log(`\n--- Server running on port ${port} ---\n`)
})
